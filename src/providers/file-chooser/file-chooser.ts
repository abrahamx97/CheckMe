import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file'

@Injectable()
export class FileChooserProvider {

    constructor(private file: File) {

    }

    listExternalRootDirectory() {
        return this.file.listDir(this.file.externalRootDirectory, '.')
    }

    listDirectory(url) {
        return this.file.listDir(url, '.')
    }

    get externalRootDirectory(): string {
        return this.file.externalRootDirectory
    }

    parseToArray(fileDescriptor: any, containHeaders: boolean, headers?: Array<string>): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let data: Array<{}> = new Array<{}>()
            let dataHeaders = new Array<string>()

            let nativeURL = (<string>fileDescriptor.nativeURL)
            let path = nativeURL.substring(0, nativeURL.lastIndexOf('/') - 1)
            let file = nativeURL.substring(nativeURL.lastIndexOf('/') + 1)

            this.file.readAsText(path, file).then(str => {
                try {
                    let input = str.replace('"', '')
                    let lines: Array<string> = input.split('\n')

                    if (containHeaders) {
                        let strHeaders = lines.shift()
                        dataHeaders = strHeaders.split(',')
                    } else {
                        dataHeaders = headers
                    }

                    lines = lines.filter((line, index, array) => {
                        if (line != "") return line
                    })

                    for (let i = 0; i < lines.length; i++) {
                        let words = lines[i].split(',')
                        let row = {}
                        for (let j = 0; j < words.length; j++) {
                            row[dataHeaders[j]] = words[j]
                        }
                        data.push(row)
                    }
                    resolve({ students: data, headers: dataHeaders })
                } catch (error) {
                    reject(error)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }



}
