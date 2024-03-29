package main

import (
	"fmt"
)

func main() {
	var r int

	// r = uniquePaths(3, 2) // expected 3
	// r = uniquePaths(3, 7) // expected 28

	r = uniquePathsWithObstacles([][]int{{0, 0, 0}, {0, 1, 0}, {0, 0, 0}}) // expected 2

	fmt.Printf("Result: %v", r)
}

// uniquePaths returns unique paths count to get to bottom-right corner.
// @see: https://leetcode.com/problems/unique-paths
func uniquePaths(m int, n int) int {
	cache := make([][]int, m)
	for i := 0; i < m; i++ {
		cache[i] = make([]int, n)
	}

	cache[0][0] = 1

	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i > 0 && j > 0 {
				cache[i][j] = cache[i-1][j] + cache[i][j-1]
			} else if i > 0 {
				cache[i][j] = cache[i-1][j]
			} else if j > 0 {
				cache[i][j] = cache[i][j-1]
			}
		}
	}
	dump(cache)

	return cache[m-1][n-1]
}

func dump(arr [][]int) {
	for _, vector := range arr {
		fmt.Printf("%v \n", vector)
	}
}

// uniquePathsWithObstacles returns count of unique paths without obstacles to get to bottom-right corner.
// @see: https://leetcode.com/problems/unique-paths-ii
func uniquePathsWithObstacles(obstacles [][]int) int {
	m := len(obstacles)
	n := len(obstacles[0])
	cache := make([][]int, m)
	for i := 0; i < m; i++ {
		cache[i] = make([]int, n)
	}

	cache[0][0] = 1

	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if obstacles[i][j] == 1 {
				cache[i][j] = 0
			} else if i > 0 && j > 0 {
				cache[i][j] = cache[i-1][j] + cache[i][j-1]
			} else if i > 0 {
				cache[i][j] = cache[i-1][j]
			} else if j > 0 {
				cache[i][j] = cache[i][j-1]
			}
		}
	}
	dump(cache)

	return cache[m-1][n-1]
}
