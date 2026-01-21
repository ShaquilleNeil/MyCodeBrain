package com.example.androidbrain.FireBasePractice;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.bumptech.glide.Glide;
import com.example.androidbrain.R;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.util.HashMap;
import java.util.Map;

public class ProductDetails extends AppCompatActivity {

    EditText etProductName, etProductPrice, etProductDescription;
    Button btnDelete, btnEdit, btnSave, btnUploadImage;
    ImageView ivProductImage;
    String id;

    private Uri imageUri;

    private ActivityResultLauncher<String> pickImageLauncher =
            registerForActivityResult(
                    new ActivityResultContracts.GetContent(),
                    uri -> {
                        if (uri != null) {
                            imageUri = uri;
                            ivProductImage.setImageURI(imageUri);
                        }
                    }
            );




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_product_details);
        etProductName = findViewById(R.id.etProductName);
        etProductPrice = findViewById(R.id.etProductPrice);
        etProductDescription = findViewById(R.id.etProductDescription);
        ivProductImage = findViewById(R.id.ivProductImage);
        btnDelete = findViewById(R.id.btnDelete);
        btnEdit = findViewById(R.id.btnEdit);
        btnSave = findViewById(R.id.btnSave);
        btnUploadImage = findViewById(R.id.btnUpdateImage);





         id = getIntent().getStringExtra("id");
        String name = getIntent().getStringExtra("name");
        Double price = getIntent().getDoubleExtra("price",0);
        String description = getIntent().getStringExtra("description");

        etProductName.setText(name);
        etProductPrice.setText(String.valueOf(price));
        etProductDescription.setText(description);

        String imageURL = getIntent().getStringExtra("image");


        Glide.with(this).
                load(imageURL)
                .placeholder(R.drawable.placehodler)
                .into(ivProductImage);

        btnUploadImage.setOnClickListener(view -> {
            pickImageLauncher.launch("image/*");
        });





        btnEdit.setOnClickListener(view -> {
            btnSave.setVisibility(View.VISIBLE);
            btnUploadImage.setVisibility(View.VISIBLE);


            btnSave.setVisibility(View.VISIBLE);
            etProductName.setEnabled(true);
            etProductPrice.setEnabled(true);
            etProductDescription.setEnabled(true);
            btnEdit.setVisibility(View.GONE);



        });


        btnSave.setOnClickListener(view -> {
            updateProduct();
            Intent intent = new Intent(ProductDetails.this, ViewAllProducts.class);
            startActivity(intent);

        });

        btnDelete.setOnClickListener(view -> {
            new AlertDialog.Builder(ProductDetails.this)
                    .setTitle("Delete Product")
                    .setMessage("Are you sure you want to delete this?")
                    .setCancelable(true)  // this matters!
                    .setPositiveButton("Delete", (dialog, which) -> {
                        deleteProduct();
                    })
                    .setNegativeButton("Cancel", (dialog, which) -> {
                        dialog.dismiss();
                    })
                    .show();

        });



    }

    private void updateProduct() {

        String newName = etProductName.getText().toString();
        String newDesc = etProductDescription.getText().toString();
        String priceText = etProductPrice.getText().toString();

        if (newName.isEmpty() || newDesc.isEmpty() || priceText.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        double newPrice;
        try {
            newPrice = Double.parseDouble(priceText);
        } catch (Exception e) {
            Toast.makeText(this, "Invalid price", Toast.LENGTH_SHORT).show();
            return;
        }

        FirebaseFirestore db = FirebaseFirestore.getInstance();

        // If user did NOT upload a new image → update only text
        if (imageUri == null) {
            Map<String, Object> updateMap = new HashMap<>();
            updateMap.put("name", newName);
            updateMap.put("description", newDesc);
            updateMap.put("price", newPrice);

            db.collection("products")
                    .document(id)
                    .update(updateMap)
                    .addOnSuccessListener(unused -> {
                        Toast.makeText(this, "Product updated!", Toast.LENGTH_SHORT).show();
                        finish();
                    });

            return;
        }

        // If user selected a NEW image → upload then update Firestore
        StorageReference newImageRef =
                FirebaseStorage.getInstance().getReference("productImages/" + id + "_updated.jpg");

        newImageRef.putFile(imageUri)
                .addOnSuccessListener(taskSnapshot ->
                        newImageRef.getDownloadUrl().addOnSuccessListener(downloadUri -> {

                            String newImageUrl = downloadUri.toString();

                            Map<String, Object> updateMap = new HashMap<>();
                            updateMap.put("name", newName);
                            updateMap.put("description", newDesc);
                            updateMap.put("price", newPrice);
                            updateMap.put("imageUrl", newImageUrl); // <-- important

                            db.collection("products")
                                    .document(id)
                                    .update(updateMap)
                                    .addOnSuccessListener(unused -> {
                                        Toast.makeText(this, "Product + image updated!", Toast.LENGTH_SHORT).show();
                                        finish();
                                    });
                        })
                )
                .addOnFailureListener(e ->
                        Toast.makeText(this, "Image upload failed", Toast.LENGTH_SHORT).show());
    }


    private void deleteProduct() {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        StorageReference imageRef = FirebaseStorage.getInstance()
                .getReference("productImages/" + id + "_updated.jpg");

        // 1. delete image
        imageRef.delete()
                .addOnSuccessListener(aVoid -> {
                    // 2. delete Firestore doc
                    db.collection("products")
                            .document(id)
                            .delete()
                            .addOnSuccessListener(unused -> {
                                Toast.makeText(this, "Product + image deleted!", Toast.LENGTH_SHORT).show();
                                finish();
                            });
                })
                .addOnFailureListener(e -> {
                    // Image delete failed → still delete product
                    db.collection("products")
                            .document(id)
                            .delete()
                            .addOnSuccessListener(unused -> {
                                Toast.makeText(this, "Product deleted (image missing)", Toast.LENGTH_SHORT).show();
                                finish();
                            });
                });
    }

    private void showDeleteConfirmation() {
        new MaterialAlertDialogBuilder(this)
                .setTitle("Delete Product?")
                .setMessage("This action cannot be undone.")
                .setIcon(R.drawable.ic_delete) // if you have one
                .setPositiveButton("Delete", (dialog, which) -> deleteProduct())
                .setNegativeButton("Cancel", (dialog, which) -> dialog.dismiss())
                .show();

    }










}