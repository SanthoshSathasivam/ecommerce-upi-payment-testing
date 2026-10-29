const { test, expect } = require('@playwright/test');

test('Customer completes a UPI payment successfully', async ({ page }) => {
  // Open the ShopEasy website
  await page.goto('http://127.0.0.1:5500/index.html');

  // Add the product to the cart
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Verify the order total
  await expect(page.locator('#total')).toHaveText('₹1,499');

  // Select UPI payment
  await page.locator('#upi').check();

  // Enter a demo UPI ID
  await page.locator('#upiId').fill('learner@okdemo');

  // Place the order
  await page.getByRole('button', { name: 'Place Order' }).click();

  // Verify the success message
  await expect(page.locator('#message'))
    .toHaveText('Demo payment successful! Order placed.');
});

// NEW TEST: Detect the incorrect product price
test('Product should display the correct price', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  await expect(page.locator('.price')).toHaveText('₹1,499');
});