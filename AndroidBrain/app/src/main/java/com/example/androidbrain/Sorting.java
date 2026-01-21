package com.example.androidbrain;

public class Sorting {


    //bubble sort
    //Compare adjacent elements in an array.
    // Swap them if they’re in the wrong order
    // Repeat until the array is sorted.
    // Best: O(n) (already sorted)
    //Worst: O(n²)
    public class BubbleSort {
        public void bubbleSort(int[] arr) {
            int n = arr.length;
            for (int i = 0; i < n - 1; i++) {
                for (int j = 0; j < n - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        // swap arr[j] and arr[j+1]
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
    }




    //Selection Sort
    //
    //How it works:
    //
    //Find the smallest (or largest) element in the array.
    //
    //Swap it with the first element.
    //
    //Repeat for the rest of the array.
    // Time Complexity: O(n²) in all cases
    //Pros: Simple, fewer swaps than bubble sort
    //Cons: Still slow for large arrays

    public class SelectionSort {
        public void selectionSort(int[] arr) {
            int n = arr.length;
            for (int i = 0; i < n - 1; i++) {
                int minIndex = i;
                for (int j = i + 1; j < n; j++) {
                    if (arr[j] < arr[minIndex]) {
                        minIndex = j;
                    }
                }
                // swap arr[i] and arr[minIndex]
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }


//Insertion Sort
//
//How it works:
//
//Take one element at a time and insert it into its correct position among the previous elements.
// Time Complexity:
//
//Best: O(n)
//
//Worst: O(n²)

    public class InsertionSort {
        public void insertionSort(int[] arr) {
            int n = arr.length;
            for (int i = 1; i < n; i++) {
                int key = arr[i];
                int j = i - 1;
                while (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = key;

                }

            }

        }

    }


//Heap Sort
//
//How it works:
//
//Build a max-heap from the array.
//
//Swap the root (largest) with the last element.
//
//Reduce heap size and heapify again.
//
//Repeat until sorted.
// Time Complexity: O(n log n)
//Pros: In-place, good worst-case performance
//Cons: Not stable, slightly slower than quicksort on average








