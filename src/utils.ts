export interface Country {
    name: {
        common: string;
    };
    capital: string;
    flags: {
        png: string;
    };
    population: number;
    timezones: string[];
    currencies: {
        [key: string]: {
            name: string;
        };
    };
}
