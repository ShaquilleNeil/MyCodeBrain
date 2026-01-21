package com.example.androidbrain;

public class MidtermJava {
    private int mediaItem = 1000;
    private int id;
    private String title;
    private int releaseYear;

    private double rating;



    public MidtermJava() {

    }

    public MidtermJava(int id, String title, int releaseYear, double rating) {
        this.id = id;
        this.title = title;
        this.releaseYear = releaseYear;
        this.rating = rating;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMediaItem() {
        return mediaItem;
    }

    public void setMediaItem(int mediaItem) {
        this.mediaItem = mediaItem;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        if (releaseYear < 1900 || releaseYear > 2021) {
            throw new IllegalArgumentException("Release year must be between 1900 and 2021");
        }
        this.releaseYear = releaseYear;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}





