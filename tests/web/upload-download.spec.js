const { test, expect } = require('@playwright/test');
const excel = require('exceljs');
const path = require('path');


async function writeExcelFile(searchText, price, changeValues, filePath) {

    const workbook = new excel.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');

    const output = readExcelFile(worksheet, searchText);

    const cell = worksheet.getCell(
        output.row,
        output.column + changeValues.colchange
    );

    cell.value = price;

    await workbook.xlsx.writeFile(filePath);

}


function readExcelFile(worksheet, searchText) {

    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNum) => {

        row.eachCell((cell, colNum) => {

            if (cell.value === searchText) {

                output.row = rowNum;
                output.column = colNum;

            }

        });

    });

    return output;
}



test('@WebsmokeTest upload and download excel validation', async ({ page }) => {


    const textSearch = 'Mango';

    const updatePrice = '123';



    await page.goto(
        'https://rahulshettyacademy.com/upload-download-test/index.html'
    );


    // Capture download event
    const downloadPromise = page.waitForEvent('download');


    await page.getByRole('button', { name: 'Download' }).click();


    const download = await downloadPromise;



    // Create CI/CD compatible file location
    const filePath = path.join(
        process.cwd(),
        'test-results',
        'download.xlsx'
    );



    // Save downloaded file
    await download.saveAs(filePath);



    // Update Excel value
    await writeExcelFile(
        textSearch,
        updatePrice,
        {
            rowChange: 0,
            colchange: 2
        },
        filePath
    );



    // Upload modified Excel file
    await page.locator('#fileinput')
        .setInputFiles(filePath);



    const desiredRow = page
        .getByRole('row')
        .filter({
            has: page.getByText(textSearch)
        });



    await expect(
        desiredRow.locator('#cell-4-undefined')
    )
        .toContainText(updatePrice);



});