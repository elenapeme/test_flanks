import fs from 'fs'
import path from 'path'
import { parse } from 'fast-csv'
import type { Investment } from '../types/Investment'

const DATA_CSV_PATH = path.join(__dirname, '..', 'data', 'data.csv')

function parseNumber(value: string): number {
    const number = parseFloat(value)
    return isNaN(number) ? 0 : number
}

export async function parseCSV(): Promise<Investment[]> {
    const csvData: Investment[] = []
    console.log(DATA_CSV_PATH, "Starting CSV parse")

    try {
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(DATA_CSV_PATH)
                .pipe(parse({ headers: true }))
                .on('error', error => {
                    console.error("Error during CSV parse:", error)
                    reject(error)
                })
                .on('data', row => {
                    row.accrued_interest = parseNumber(row.accrued_interest)
                    row.number_of_shares = parseNumber(row.number_of_shares)
                    row.balance = parseNumber(row.balance)
                    row.capital_gain = parseNumber(row.capital_gain)
                    row.cost = parseNumber(row.cost)
                    row.interest_rate = parseNumber(row.interest_rate)
                    row.rate_to_euro = parseNumber(row.rate_to_euro)
                    csvData.push(row)
                })
                .on('end', (rowCount: number) => {
                    console.log(`Parsed ${rowCount} rows`)
                    resolve()
                })
        })
        return csvData
    } catch (err) {
        console.error("Error in parseCSV function:", err)
        throw new Error(`Failed to parse CSV file: ${err}`)
    }
}