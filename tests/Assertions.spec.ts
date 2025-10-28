import {test, expect} from '@playwright/test'


test('tobehidden', async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await expect(page.locator("div[id='finish'] h4")).toBeHidden();
    await page.locator("div[id='start'] button").click();
    await expect(page.locator("div[id='finish'] h4")).toBeVisible({ timeout: 10_000 });

   // await page.locator("//button[normalize-space()='Login']").click();
   // await expect(page.locator('//div[normalize-space()="Email is required !"]')).toBeVisible();

});


test('ToBePresent', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
await expect(page.locator('.added-manually')).not.toHaveCount(1);
await page.locator('button[onclick="addElement()"]').click();
await expect(page.locator('.added-manually')).toHaveCount(1);
await page.close();
});


test('ToBeEnabled', async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator('input[type="text"]')).toBeDisabled();
    await page.locator('button[onclick="swapInput()"]').click();
    await expect(page.locator('input[type="text"]')).toBeEnabled();
    await expect(page.locator('#message')).toContainText("It's enabled!");
    await page.locator('button[onclick="swapInput()"]').click();
    await expect(page.locator('#message')).toContainText("It's disabled!");

});


test('toHaveText', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
await expect(page.locator('button[onclick="swapInput()"]')).toHaveText('Enable');
await expect(page.locator('button[onclick="swapInput()"]')).not.toHaveText('Enabled');
await page.close();
});

test('toHaveAttribute', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
await expect(page.locator('button[onclick="swapInput()"]')).toHaveAttribute('autocomplete','off');

});

test('url', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
//full url
await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls');

//partial url
await expect(page).toHaveURL(/the-internet.herokuapp.com/)

});

test('toHaveTitle', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
//full Title
await expect(page).toHaveTitle('The Internet');

//partial Title
await expect(page).toHaveTitle(/.*The Internet/)

});

test('toHaveScreenshot', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

await expect(page).toHaveScreenshot();

});