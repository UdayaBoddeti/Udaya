// To test the prime number program 

#include <stdio.h>
#include "PrimeNumber.c"
#define INPUT_COUNT 15
#define LENGTH 8

void testPrime()
{
	char values[INPUT_COUNT][LENGTH] = {"0", "12", "2", "1", "313", "-34", "ABC", "a104", "A", "23432", "43109", "3", "11A", "@", " "};
	int counter = 0, isSuccessfull = 1;
	for (counter = 0; counter < INPUT_COUNT; counter++)
	{
		if(isPrime(values[counter]) == -1)
		{
			isSuccessfull = 0;
		    printf("Test Failed(%s)\n", values[counter]);
		}
	}
	if (isSuccessfull == 1)
	{
		printf("All tests are passed.\n");
	}	
}

void main()
{
	testPrime();
}
