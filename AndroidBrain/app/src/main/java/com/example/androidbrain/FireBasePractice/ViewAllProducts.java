package com.example.androidbrain.FireBasePractice;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidbrain.R;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;

public class ViewAllProducts extends AppCompatActivity {

    RecyclerView rviewProducts;
    ProductAdapter adapter;
    ArrayList<Product> list;

    FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_view_all_products);


        //set up firebase
        db = FirebaseFirestore.getInstance();


        //set up arraylist
        list = new ArrayList<>();


        //set up recycler view
        rviewProducts = findViewById(R.id.rviewProducts);
        rviewProducts.setLayoutManager(new LinearLayoutManager(this));

        adapter = new ProductAdapter(this, list);
        rviewProducts.setAdapter(adapter);

        loadproducts();


    }

    @Override
    protected void onResume() {
        super.onResume();
        loadproducts();
    }



    private void loadproducts() {
        db.collection("products")
                .addSnapshotListener((queryDocumentSnapshots, error) -> {
                    if (error != null) {
                        return;
                    }

                    list.clear();
                    for (DocumentSnapshot documentSnapshot : queryDocumentSnapshots) {
                        Product product = documentSnapshot.toObject(Product.class);
                        if (product != null) {
                            product.setId(documentSnapshot.getId());  // keep this
                            list.add(product);
                        }
                    }
                    adapter.notifyDataSetChanged();
                });
    }

}