package com.example.androidbrain;

public class HeapSort {

    // Main function to sort an array using Heap Sort
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Heapify reduced heap
            heapify(arr, i, 0);
        }
    }

    // Heapify a subtree rooted at index i
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;         // Initialize largest as root
        int left = 2 * i + 1;    // left child
        int right = 2 * i + 2;   // right child

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest])
            largest = left;

        // If right child is larger than largest
        if (right < n && arr[right] > arr[largest])
            largest = right;

        // If largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify the affected subtree
            heapify(arr, n, largest);
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};

        System.out.println("Original array:");
        for (int num : arr) System.out.print(num + " ");
        System.out.println();

        heapSort(arr);

        System.out.println("Sorted array:");
        for (int num : arr) System.out.print(num + " ");
    }
}
