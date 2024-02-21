// To perform CRUDS operations on binary tree 

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ID_LENGTH 20
#define DESC_LENGTH 40
#define ITEMS_FILE "items.dat"
#define PRINT_ITEM_NOT_FOUND(itemId) printf("Item %s not found!\n", itemId);
#define PRINT_OPERATION_STATUS(operation, itemId) printf("Item %s %s successfully.\n", itemId, operation);

struct Item
{
	char itemId[ID_LENGTH];
	char itemDescription[DESC_LENGTH];
	float itemPrice;
};

struct Node
{
	struct Item item;
	struct Node *left, *right;
};

struct Node *root, *currentNode, *newNode, *matchingNode = NULL;
FILE *fpItems;
struct Item item;
char itemId[ID_LENGTH];

struct Node* getMatchingNode(struct Node *currentNode, char itemId[]);

struct Node* createNode(struct Item item)
{
	newNode = (struct Node*)malloc(sizeof(struct Node));
	newNode->item = item;
	newNode->left = NULL;
	newNode->right = NULL;
	return newNode;
}

void addNode(struct Node **node, struct Item item)
{
	if (*node == NULL)
	{
		newNode = createNode(item);
		if (root == NULL)
		{
			root = newNode;
		}
		*node = newNode;
	}
	else if (strcmp(item.itemId, (&(*node)->item.itemId)) == -1)
	{
		addNode(&(*node)->left, item);
	}
	else
	{
		addNode(&(*node)->right, item);
	}
}

void loadItems()
{
	fpItems = fopen(ITEMS_FILE, "r");
	while (fread(&item, sizeof(item), 1, fpItems))
	{
		addNode(&root, item);
	}
	fclose(fpItems);
}

struct Item getItemDetails()
{
	int flag;
	do
	{
		int randomNumber = (rand() % 1000);
		sprintf(item.itemId, "%s%.3d", "AP", randomNumber);
		if (getMatchingNode(root, item.itemId) == 0)
		{
			flag = 0;
		}
		else
		{
			flag = 1;
		}
	}while (flag == 1);

	printf("Enter item description of %s: ", item.itemId);
	scanf("%s", item.itemDescription);
	printf("Enter item price of %s: ", item.itemId);
	scanf("%f", &item.itemPrice);
	return item;
}

void saveItems(struct Node *currentNode)
{
	if (currentNode != NULL)
	{
		fwrite(&(currentNode->item), sizeof(item), 1, fpItems);
		saveItems(currentNode->left);
		saveItems(currentNode->right);
	}
}

void preOrder(struct Node *root)
{
	if (root != NULL)
	{
		printf("\n");
		printf("Id: %s\n", root->item.itemId);
		printf("Description: %s\n", root->item.itemDescription);
		printf("Price: %f\n", root->item.itemPrice);
		preOrder(root->left);
		preOrder(root->right);
	}
}

char* getItemId(char operation[])
{
	printf("Please enter item id to %s: ", operation);
	scanf("%s", itemId);
	return itemId;
}

struct Node* getMatchingNode(struct Node *currentNode, char itemId[])
{
	if (currentNode == NULL)
	{
		return NULL;
	}
	if (strcmp(currentNode ->item.itemId, itemId) == 0 && currentNode != NULL)
	{
		return currentNode;
	}
	else if(strcmp(itemId, currentNode ->item.itemId) == -1)
	{
		getMatchingNode(currentNode->left, itemId);
	}
	else
	{
		getMatchingNode(currentNode->right, itemId);
	}
}

void searchItem(char itemId[])
{
	matchingNode = getMatchingNode(root, itemId);
	if (matchingNode != NULL)
	{
		printf("Id: %s\n", matchingNode->item.itemId);
		printf("Description: %s\n", matchingNode->item.itemDescription);
		printf("Price: %.2f\n", matchingNode->item.itemPrice);
	}
	else
	{
		printf("Item %s not found!\n", itemId);
	}
}

struct Node* findMininmum(struct Node *currentNode)
{
	if (currentNode == NULL)
	{
		return NULL;
	}
	else if (currentNode->left != NULL)
	{
		return findMininmum(currentNode->left);
	}
	return currentNode;
}

struct Node* deleteItem(struct Node *currentNode, char itemId[])
{
	if (currentNode == NULL)
	{
		return NULL;
	}
	if (strcmp(itemId, currentNode->item.itemId) == -1)
	{
		currentNode->left = deleteItem(currentNode->left, itemId);
	}
	else if(strcmp(itemId, currentNode->item.itemId) == 1)
	{
		currentNode->right = deleteItem(currentNode->right, itemId);
	}
	else if (strcmp(itemId, currentNode->item.itemId) == 0)
	{
		if (currentNode->left == NULL && currentNode->right == NULL)
		{
			if (currentNode == root)
			{
				root = NULL;
			}
			free(currentNode);
			return NULL;
		}
		else if(currentNode->left == NULL || currentNode->right == NULL)
		{
			struct Node *temp;
			if (currentNode->left == NULL)
			{
				temp = currentNode->right;
				if (root == currentNode)
				{
					root = temp;
				}
			}
			else
			{
				temp = currentNode->left;
				if (root == currentNode)
				{
					root = temp;
				}
			}
			free(currentNode);
			return temp;
		}
		else
		{
			struct Node *temp = findMininmum(currentNode->right);
			currentNode->item = temp->item;
			currentNode->right = deleteItem(currentNode->right, currentNode->item.itemId);
		}
	}
	return currentNode;
}

float getNewPrice(char itemId[])
{
	float newPrice;
	printf("Enter item id %s\'s new price: ");
	scanf("%f", &newPrice);
	return newPrice;
}

void updateItem(char itemId[])
{
	matchingNode = getMatchingNode(root, itemId);
	if (matchingNode != NULL)
	{
		matchingNode->item.itemPrice = getNewPrice(itemId);
		saveItems(root);
		PRINT_OPERATION_STATUS("price updated", itemId);
	}
	else
	{
		PRINT_ITEM_NOT_FOUND(itemId);
	}
}

void showMenu()
{
	int choice;
	char *itemId;
	printf("\tDMART\n");
	printf("-----------------------------------\n");
	printf("0. Exit\n1. Add item\n2. Show items\n3. Update item\n4. Delete item\n5. Search item\n");
	printf("-----------------------------------\n");
	printf("Enter your choice: ");
	scanf("%d", &choice);

	switch(choice)
	{
		case 0: exit(0);
		case 1: addNode(&root, getItemDetails());
				fpItems = fopen(ITEMS_FILE, "w");
				saveItems(root);
				PRINT_OPERATION_STATUS("added", item.itemId);
				fclose(fpItems);
				break;
		case 2: preOrder(root);
				break;
		case 3: updateItem(getItemId("update"));
				break;
		case 4: itemId = getItemId("delete");
				if (getMatchingNode(root, itemId) == NULL)
				{
					PRINT_ITEM_NOT_FOUND(itemId);
				}
				else
				{
					deleteItem(root, itemId);
					fpItems = fopen(ITEMS_FILE, "w");
					saveItems(root);
					fclose(fpItems);
					PRINT_OPERATION_STATUS("deleted", itemId);
				}
				break;
		case 5: searchItem(getItemId("search"));
				break;
		default: printf("Invalid choice!\n");
				 break;
	}
}

void main()
{
	loadItems();
	while (1)
	{
		showMenu();
	}
}
