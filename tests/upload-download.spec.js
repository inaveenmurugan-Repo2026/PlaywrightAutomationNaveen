
const { test, expect } = require('@playwright/test');
const excel = (() => {
    try {
        return require('exceljs');
    } catch (err) {
        console.error("Module 'exceljs' not found. Install it with: npm install exceljs");
        throw err;
    }
})();
async function writeExcelFile(searchText, price, changeValues, filePath) { //the text is traversed from the function parameter and passed to the readExcelFile function to search in the Excel file
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcelFile(worksheet, searchText); // we need call the function to execute the code and read the Excel file   
    const cell = worksheet.getCell(output.row, output.column + changeValues.colchange); //we are adding the colchange value to the column number to update the cell value in the next column
    cell.value = price;
    await workbook.xlsx.writeFile(filePath);

}

function readExcelFile(worksheet, searchText) {
    let output = { row: -1, column: -1 }  //output doesnot have any value until the searchText is found in the Excel file, so we are initializing it with -1
    worksheet.eachRow((row, rowNum) => {
        row.eachCell((cell, colNum) => {
            if (cell.value === searchText) {
                output.row = rowNum;
                output.column = colNum;
            }
        })
    })
    return output; //returning the output object to the writeExcelFile function to update the cell value
}
//writeExcelFile("Mango", 2226, { rowChange: 0, colchange: 2 }, 'C:\\Users\\Admin\\Downloads\\download.xlsx'); //sending this as an argument to the function to search in the Excel file
// we need call the function to execute the code and read the Excel file
test('@WebsmokeTest upload and download excel validation', async ({ page }) => {

    const textSearch = 'Mango';
    const updatePrice = '123';
    const filePath = 'C:\\Users\\Admin\\Downloads\\download.xlsx';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    //const downloadPromise = page.waitForEvent('download');
    //const downloadPromise =await page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click(); // it will filter all the buttons and click on the button which has the name 'Download'
    //  await downloadPromise; // it will wait for the download to complete before proceeding to the next step

    await writeExcelFile(textSearch, updatePrice, { rowChange: 0, colchange: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);// it will upload the file to the website and note it will only take if the file is present in the inputfile of dom in the website.

    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatePrice);
    // await expect(page.getByText('Updated Excel Data Successfully.')).toBeVisible();
    await page.screenshot({ path: 'screenshot143.png' });
    await page.pause();
});
