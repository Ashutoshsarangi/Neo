import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


export class NgbDateFormatterFactory extends NgbDateParserFormatter {

    constructor() {
        super();
    }

    format(date: NgbDateStruct): string {
        let formattedDate = '';
        if (date === null) {
            return '';
        }
        if (date) {

            const month = ('0' + date.month).slice(-2);
            const day = ('0' + date.day).slice(-2);

            formattedDate = day + '.' + month + '.' + date.year;
        }
        return formattedDate;
    }

    parse(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        const d = value.split('.');
        return {
            year: parseInt(d[2], 10),
            month: parseInt(d[1], 10),
            day: parseInt(d[0], 10)
        };
    }
}