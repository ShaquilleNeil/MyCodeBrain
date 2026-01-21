package com.example.androidbrain.FireBasePractice;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidbrain.R;

public class ProductsMainPage extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_products_main_page);

    }
}


//get a firestore instance
//FirebaseFirestore db = FirebaseFirestore.getInstance();


// add a document auto-ID
/** Map<String, Object> product = new HashMap<>();
 product.put("name", "Laptop");
 product.put("price", 999.99);
 product.put("quantity", 5);

 db.collection("products")
 .add(product)
 .addOnSuccessListener(docRef -> {
 Log.d("FIRESTORE", "Added with ID: " + docRef.getId());
 })
 .addOnFailureListener(e -> {
 Log.e("FIRESTORE", "Error adding document", e);
 });
**/

//add or replace a document using custom id
/** String productId = "product123";

 db.collection("products")
 .document(productId)
 .set(productData)
 .addOnSuccessListener(aVoid -> Log.d("FIRESTORE", "Document written!"));
**/


//read a document
/** db.collection("products")
 .document(productId)
 .get()
 .addOnSuccessListener(doc -> {
 if (doc.exists()) {
 String name = doc.getString("name");
 Double price = doc.getDouble("price");
 Long quantity = doc.getLong("quantity");
 }
 });
**/

// read all documents
/** db.collection("products")
 .get()
 .addOnSuccessListener(query -> {
 for (DocumentSnapshot doc : query) {
 Log.d("FIRESTORE", "Item: " + doc.getData());
 }
 });
**/

//update specific fields
/** db.collection("products")
 .document(productId)
 .update("price", 129.99,
 "quantity", 10)
 .addOnSuccessListener(aVoid -> Log.d("FIRESTORE", "Updated!"));
**/

//Delete document
/** db.collection("products")
 .document(productId)
 .delete()
 .addOnSuccessListener(aVoid -> Log.d("FIRESTORE", "Deleted!"));
**/

//listen for changes
/** ListenerRegistration reg = db.collection("products")
 .addSnapshotListener((value, error) -> {
 if (error != null) return;

 for (DocumentSnapshot doc : value) {
 Log.d("RT", doc.getData().toString());
 }
 });
**/

//upload image to firebase storage + save url
/** StorageReference ref = FirebaseStorage.getInstance()
 .getReference("productImages/" + UUID.randomUUID().toString());

 ref.putFile(imageUri)
 .addOnSuccessListener(task -> {
 ref.getDownloadUrl().addOnSuccessListener(url -> {

 String imageUrl = url.toString(); // <-- save this to Firestore

 Map<String, Object> product = new HashMap<>();
 product.put("name", "Sneakers");
 product.put("imageUrl", imageUrl);

 db.collection("products").add(product);
 });
 });
**/

//download image with glide
/**Glide.with(context)
 .load(imageUrl)
 .placeholder(R.drawable.placeholder)
 .into(imageView);


 */