import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const mandatoryFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const len = mandatoryFields.length;

const parsePassport = input => input.trim().split(/\s/).reduce((acc, item) => {
    const [key, value] = item.split(':');
    acc[key] = value;
    return acc;
}, {});

const validatePassportField = (key, value) => {
    let tmp;

    switch(key) {
        case 'byr':
            tmp = parseInt(value, 10);
            return 1920 <= tmp && tmp <= 2002;
        case 'iyr':
            tmp = parseInt(value, 10);
            return 2010 <= tmp && tmp <= 2020;
        case 'eyr':
            tmp = parseInt(value, 10);
            return 2020 <= tmp && tmp <= 2030;
        case 'hgt':
            tmp = value.match(/^(\d+)(in|cm)$/);
            if (!tmp) {
                return false;
            }
            const um = tmp[2];
            const h = parseInt(tmp[1], 10);
            if (um === 'cm') {
                return 150 <= h && h <= 193;
            }
            if (um === 'in') {
                return 59 <= h && h <= 76;
            }
        case 'hcl':
            return /^#[\da-f]{6}$/.test(value);
        case 'ecl':
            return ['amb','blu','brn','gry','grn','hzl','oth'].includes(value);
        case 'pid':
            return /^\d{9}$/.test(value);
        default:
            return true;
    }
};

const isValid = passport => {
    for (let i = 0; i < len; i++) {
        const key = mandatoryFields[i];
        const value = passport[key]
        if(!value || !validatePassportField(key, value)) {
            return false;
        }
    }
    return true;
};

const parseBatch = input => input.split('\n\n').map(parsePassport);

const validatePassports = parseBatch(input).filter(isValid);

const testsFields = [
    {
        key: 'byr',
        valid: true,
        value: 2002
    },
    {
        key: 'byr',
        valid: false,
        value: 2003
    },
    {
        key: 'hgt',
        valid: true,
        value: '60in'
    },
    {
        key: 'hgt',
        valid: true,
        value: '190cm'
    },
    {
        key: 'hgt',
        valid: false,
        value: '190in'
    },
    {
        key: 'hgt',
        valid: false,
        value: '190'
    },
    {
        key: 'hcl',
        valid: true,
        value: '#123abc'
    },
    {
        key: 'hcl',
        valid: false,
        value: '#123abz'
    },
    {
        key: 'hcl',
        valid: false,
        value: '123abc'
    },
    {
        key: 'ecl',
        valid: true,
        value: 'brn'
    },
    {
        key: 'ecl',
        valid: false,
        value: 'wat'
    },
    {
        key: 'pid',
        valid: true,
        value: '000000001'
    },
    {
        key: 'pid',
        valid: false,
        value: '0123456789'
    }
];

const testsPasswords = [
    {
        string: `eyr:1972 cid:100
        hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926`,
        valid: false
    },
    {
        string: `iyr:2019
        hcl:#602927 eyr:1967 hgt:170cm
        ecl:grn pid:012533040 byr:1946`,
        valid: false
    },
    {
        string: `hcl:dab227 iyr:2012
        ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277`,
        valid: false
    },
    {
        string: `hgt:59cm ecl:zzz
        eyr:2038 hcl:74454a iyr:2023
        pid:3556412378 byr:2007`,
        valid: false
    },
    {
        string: `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
        hcl:#623a2f`,
        valid: true
    },
    {
        string: `eyr:2029 ecl:blu cid:129 byr:1989
        iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm`,
        valid: true
    },
    {
        string: `hcl:#888785
        hgt:164cm byr:2001 iyr:2015 cid:88
        pid:545766238 ecl:hzl
        eyr:2022`,
        valid: true
    },
    {
        string: `iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`,
        valid: true
    }
];

testsFields.forEach(({ key, value, valid }) => {
    const res = validatePassportField(key, value);
    if (res === valid) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

testsPasswords.forEach(({ string, valid }) => {
    const res = isValid(parsePassport(string));
    if (res === valid) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(validatePassports.length);
