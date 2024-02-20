// To check whether the given number is prime number or not

#include <stdio.h>
#include <math.h>
#include <string.h>

int inputvalidation(char value[])
{
    int length = strlen(value), count = 0, number = atoi(value);
    count = (number == 0) ? 1 : log10(number) + 1;
    if (number == 0 && value[0] != '0' || count != length)
    {
       return -1;
    }
    else if (count == length)
    {
       return number;
    }	
}

int isPrime(char value[])
{
	int counter, number, isprime = -1;
	number = inputvalidation(value);
	if (number == -1)
	{
		isprime = 0;
	}	
	if (number == 0 || number == 1)
	{
	isprime = 0;
	}	
	else if (number == 2 || number == 3)
	{
	isprime = 1;
	}
	else if(number % 2 == 0)
	{
	   isprime = 0;
	}
	else
	{
		int squareroot_value = sqrt(number);
		isprime = 1;
		for (counter = 3; counter <= squareroot_value; counter += 2)
		{
			if (number % counter == 0)
			{
			   isprime = 0;	
	       break;
			}	
		}	
	}
	return isprime;
}

