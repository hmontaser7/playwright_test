import{test, expect} from '@playwright/test'


test('textBox', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/login');
//fill full word
await page.locator('input[id="username"]').fill('tomsmith');
//pressSequentially and delay
await page.locator('[id="password"]').pressSequentially('SuperSecretPassword!', {delay:200});
//press keys from keyboard
await page.locator('[id="password"]').press('Enter');
await page.close();

});


test('mouseClicks', async({page})=>{

await page.goto('https://play1.automationcamp.ir/mouse_events.html');

await page.locator('[id="click_area"]').click();
await expect(page.locator('[id="click_type"]')).toHaveText('Click');
await page.locator('[id="click_area"]').dblclick();
await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click');
await page.locator('[id="click_area"]').click({button:'right'});
await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click');

await page.close();

});


test('radio', async({page})=>{

    await page.goto('http://test.rubywatir.com/radios.php');
    await page.locator('[id="radioId"]').check();
    await expect(page.locator('[class="radioclass"]')).not.toBeChecked();
    await page.locator('[class="radioclass"]').check();
    await expect(page.locator('[class="radioclass"]')).toBeChecked();
    await page.close();
});


test('checkBox', async({page})=>{

    await page.goto('http://test.rubywatir.com/radios.php');
    await page.locator('[id="radioId"]').check();
    await expect(page.locator('[class="radioclass"]')).not.toBeChecked();
    await page.locator('[class="radioclass"]').check();
    await expect(page.locator('[class="radioclass"]')).toBeChecked();
    await page.close();
});


test('dropdown', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/dropdown');

await page.selectOption('[id="dropdown"]',{

    value:"1"
});
await page.pause();
await page.selectOption('[id="dropdown"]',{

    label:"Option 2"
});
await page.pause();
await page.selectOption('[id="dropdown"]',{

    index:1
});

});

test('multiSelect', async({page})=>{

await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
await page.selectOption('[id="multi-select"]',[  
    {value:"California"},
    {value:"Florida"},
    {value:"New York"}
])
await page.pause();
});


test('dynamicDropdownList', async({page})=>{


    await page.goto('https://demo.automationtesting.in/Register.html');
    await page.locator('[role="combobox"]').click();
    await page.locator('//li[text()="Denmark"]').click();
    await page.pause();

});

test('JSAlert',async({page})=>{

await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
await page.locator('[onclick="jsAlert()"]').click();
await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');
await page.pause();
});


test('tabs', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/windows');
await page.pause();
    const [browserTabs] = await Promise.all([

        page.waitForEvent('popup'), await page.locator('[href="/windows/new"]').click()
        
    ])
    
    await browserTabs.waitForLoadState();
    const allPages = browserTabs.context().pages();

    const defaultTab= allPages[0];
    await expect(defaultTab.locator('//h3')).toContainText('Opening a new window'); 
    const latestTab = allPages[allPages.length-1];

    await expect(latestTab.locator('//h3')).toContainText('New Window');
    

    defaultTab.close();
    //latestTab.close();
});