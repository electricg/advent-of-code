import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      const [key, value] = line.split(': ');
      acc[key.toLowerCase().replace(' ', '_')] = Number(value);
      return acc;
    }, {});

const SHOP = `
Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3
`;

const parseShop = (input) => {
  return input
    .trim()
    .split('\n\n')
    .reduce((shop, block) => {
      const [header, ...items] = block.split('\n');
      const [type, ...attrId] = header
        .toLowerCase()
        .replace(':', '')
        .split(/\s+/);
      const parsedList = items.map((item) => {
        const [id, ...attrs] = item.split(/\s{2,}/);
        const detail = attrs.reduce((acc, attr, i) => {
          acc[attrId[i]] = Number(attr);
          return acc;
        }, {});
        // console.log({ id, detail });

        return { id, ...detail };
      });
      shop[type] = parsedList;
      return shop;
    }, {});
};

// create all possible combinations of equipment
const calcCombinations = (shop) => {
  const { weapons, armor, rings } = shop;
  const permutations = [];
  const empty = { id: 'Nothing', cost: 0, damage: 0, armor: 0 };

  // armor is optional, so adding one empty item for the permutations
  armor.unshift({ ...empty });

  // rings are optional and can buy 0-2, so adding two empty items for the permutations
  // it will create some duplicates since 'nothing1' and 'nothing2' are the same, but it won't matter in this case
  rings.unshift({ ...empty });
  rings.unshift({ ...empty });

  for (let w = 0; w < weapons.length; w++) {
    for (let a = 0; a < armor.length; a++) {
      for (let r1 = 0; r1 < rings.length; r1++) {
        const rings2 = [...rings.slice(0, r1), ...rings.slice(r1 + 1)];
        for (let r2 = 0; r2 < rings2.length; r2++) {
          permutations.push({
            weapon: weapons[w],
            armor: armor[a],
            ring1: rings[r1],
            ring2: rings2[r2],
            total: {
              cost:
                weapons[w].cost +
                armor[a].cost +
                rings[r1].cost +
                rings2[r2].cost,
              damage:
                weapons[w].damage +
                armor[a].damage +
                rings[r1].damage +
                rings2[r2].damage,
              armor:
                weapons[w].armor +
                armor[a].armor +
                rings[r1].armor +
                rings2[r2].armor,
            },
          });
        }
      }
    }
  }
  return permutations;
};

const calcHit = (damage, armor) => Math.max(1, damage - armor);

// calculate how many turns it take to win
const calcTurns = (hit_points, damage, armor) => {
  const hit = calcHit(damage, armor);
  return Math.ceil(hit_points / hit);
};

// calculate if player is going to win
const hasPlayerWon = (player, boss) => {
  const playerTurns = calcTurns(boss.hit_points, player.damage, boss.armor);
  const bossTurns = calcTurns(player.hit_points, boss.damage, player.armor);
  // console.log('playerTurns', playerTurns, 'bossTurns', bossTurns);
  return playerTurns <= bossTurns;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const boss = { ...parsedInput };
  const playerStart = { hit_points: 100, damage: 0, armor: 0 };
  // console.log(bossStart, playerStart);

  const shop = parseShop(SHOP);
  // console.log(shop);

  const combinations = calcCombinations(shop);
  // console.log(combinations.at(1));
  combinations.sort((a, b) => {
    return b.total.cost - a.total.cost;
  });
  // console.log(combinations.at(1));

  // since it's sorted by cost, the first combination to win is the solution
  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i];
    const player = { ...playerStart };
    player.damage += combination.total.damage;
    player.armor += combination.total.armor;
    if (!hasPlayerWon(player, boss)) {
      return combination.total.cost;
    }
  }

  return 0;
};

console.log(calcSolution(input));
