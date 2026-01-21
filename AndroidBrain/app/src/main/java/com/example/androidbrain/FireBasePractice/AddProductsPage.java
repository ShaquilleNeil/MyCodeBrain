package com.example.androidbrain.FireBasePractice;

import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidbrain.R;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.util.UUID;

public class AddProductsPage extends AppCompatActivity {

    ImageView ivproductImage;
    EditText etProductName;
    EditText etProductDescription;
    EditText etProductPrice;
    Button btnAddProduct, btnUploadImage;


    //create launcher for image picker
    private Uri imageUri;

    private ActivityResultLauncher<String> pickImageLauncher =
            registerForActivityResult(
                    new ActivityResultContracts.GetContent(),
                    uri -> {
                        if (uri != null) {
                            imageUri = uri;
                            ivproductImage.setImageURI(imageUri);
                        }
                    }
            );






    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.add_products_page);

        ivproductImage = findViewById(R.id.ivProductImage);
        etProductName = findViewById(R.id.etProductName);
        etProductDescription = findViewById(R.id.etProductDescription);
        etProductPrice = findViewById(R.id.etProductPrice);
        btnAddProduct = findViewById(R.id.btnAddProduct);
        btnUploadImage = findViewById(R.id.btnUploadImage);


        FirebaseFirestore db = FirebaseFirestore.getInstance();



        btnAddProduct.setOnClickListener(view -> {
            String productName = etProductName.getText().toString();
            String productDescription = etProductDescription.getText().toString();
            String productPrice = etProductPrice.getText().toString();

            if (productName.isEmpty() || productDescription.isEmpty() || productPrice.isEmpty()) {
                Toast.makeText(this, "Please fill all the fields", Toast.LENGTH_SHORT).show();
                return;
            }

            if (imageUri == null) {
                Toast.makeText(this, "Please upload an image", Toast.LENGTH_SHORT).show();
                return;
            }

            double price;
            try {
                price = Double.parseDouble(productPrice);
            } catch (NumberFormatException e) {
                Toast.makeText(this, "Please enter a valid price", Toast.LENGTH_SHORT).show();
                return;
            }

            StorageReference storage = FirebaseStorage.getInstance()
                    .getReference("productImages/" + UUID.randomUUID().toString());

            storage.putFile(imageUri)
                    .addOnSuccessListener(taskSnapshot -> {
                        storage.getDownloadUrl().addOnSuccessListener(uri -> {
                            String imageUrl = uri.toString();

                            String productId = UUID.randomUUID().toString();
                            Product product = new Product(productId, productName, productDescription, price, imageUrl);

                            db.collection("products")
                                    .add(product)
                                    .addOnSuccessListener(documentReference -> {
                                        Toast.makeText(this, "Product added successfully", Toast.LENGTH_SHORT).show();
                                    })
                                    .addOnFailureListener(e -> {
                                        Toast.makeText(this, "Failed to add product", Toast.LENGTH_SHORT).show();
                                        e.printStackTrace();
                                    });
                        });
                    })
                    .addOnFailureListener(e -> {
                        Toast.makeText(this, "Failed to upload image", Toast.LENGTH_SHORT).show();
                        e.printStackTrace();
                    });
        });



        btnUploadImage.setOnClickListener(view -> {
            pickImageLauncher.launch("image/*");
        });




    }


}