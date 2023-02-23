import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const calcHit = (damage, armor) => {
  if (armor >= damage) {
    return 1;
  }
  return damage - armor;
};

const parseInput = (input) => {
  return input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      if (line) {
        const [key, val] = line.split(': ');
        acc[key.trim()] = val.trim() * 1;
      }
      return acc;
    }, {});
};

const parseShop = (input) => {
  return input
    .trim()
    .split('\n\n')
    .reduce((acc, block) => {
      const [title, ...lines] = block.trim().split('\n');
      const [type] = title.trim().split(':');
      const items = lines.map((line) => {
        const [name, cost, damage, armor] = line.split(/\s{2,}/);
        return {
          name,
          cost: cost * 1,
          damage: damage * 1,
          armor: armor * 1,
        };
      });
      acc[type] = items;
      return acc;
    }, {});
};

const calcCombinations = (shop) => {
  const { Weapons, Armor, Rings } = shop;
  const noArmor = { name: 'No Armor', cost: 0, damage: 0, armor: 0 };
  const noRing = { name: 'No Ring', cost: 0, damage: 0, armor: 0 };
  const allRings = [noRing, ...Rings];
  const res = [];

  Weapons.forEach((w) => {
    // console.log(w.name);

    [noArmor, ...Armor].forEach((a) => {
      // console.log(' ', a.name);

      // console.log('   -', noRing.name);
      res.push([
        {
          cost: w.cost + a.cost + noRing.cost,
          damage: w.damage + a.damage + noRing.damage,
          armor: w.armor + a.armor + noRing.armor,
        },
        w,
        a,
        noRing,
      ]);

      for (let index = 0; index < allRings.length - 1; index++) {
        // console.log('   -', allRings[index].name);

        for (let i = index; i < Rings.length; i++) {
          // console.log('     +', Rings[i].name);
          res.push([
            {
              cost: w.cost + a.cost + allRings[index].cost + Rings[i].cost,
              damage:
                w.damage + a.damage + allRings[index].damage + Rings[i].damage,
              armor: w.armor + a.armor + allRings[index].armor + Rings[i].armor,
            },
            w,
            a,
            allRings[index],
            Rings[i],
          ]);
        }
      }
    });
  });

  // console.log(res[7]);
  // console.log(res[res.length - 1]);

  return res;
};

const calcTurns = (points, damage, armor) => {
  const hit = calcHit(damage, armor);
  const turns = Math.ceil(points / hit);
  return turns;
};

const calcVictory = (me, boss) => {
  const myTurns = calcTurns(boss.points, me.damage, boss.armor);
  const bossTurns = calcTurns(me.points, boss.damage, me.armor);
  // console.log('myTurns', myTurns, 'bossTurns', bossTurns);
  return myTurns <= bossTurns;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const boss = {
    points: parsedInput['Hit Points'],
    damage: parsedInput['Damage'],
    armor: parsedInput['Armor'],
  };
  // console.log(boss);
  const shop = parseShop(shopTxt);
  // console.log(shop);
  const combos = calcCombinations(shop);

  let min = Infinity;

  combos.forEach((combo) => {
    if (
      calcVictory(
        {
          ...combo[0],
          points: 100,
        },
        boss
      )
    ) {
      if (combo[0].cost < min) {
        min = combo[0].cost;
        // console.log(combo);
      }
    }
  });
  return min;
};

const shopTxt = `
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

// const tests = [
//   {
//     inp: '',
//     out: '',
//   },
// ];

// tests.forEach(({ inp, out }) => {
//   const res = calcSolution(inp);
//   if (res === out) {
//     console.log(`✅`);
//   } else {
//     console.error(`❌`);
//   }
// });

console.log(calcSolution(input));
