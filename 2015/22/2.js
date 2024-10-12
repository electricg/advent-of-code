import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  return input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      const [key, val] = line.split(': ');
      acc[key.trim().toLowerCase().replace(' ', '_')] = Number(val.trim());
      return acc;
    }, {});
};

const spellBasic = {
  damage: 0,
  armor: 0,
  heal: 0,
  mana: 0,
  duration: 0,
};

const SPELLS = {
  'Magic Missile': {
    name: 'Magic Missile',
    ...spellBasic,
    cost: 53,
    damage: 4,
  },
  Drain: {
    name: 'Drain',
    ...spellBasic,
    cost: 73,
    damage: 2,
    heal: 2,
  },
  Shield: {
    name: 'Shield',
    ...spellBasic,
    cost: 113,
    armor: 7,
    duration: 6,
  },
  Poison: {
    name: 'Poison',
    ...spellBasic,
    cost: 173,
    damage: 3,
    duration: 6,
  },
  Recharge: {
    name: 'Recharge',
    ...spellBasic,
    cost: 229,
    mana: 101,
    duration: 5,
  },
};

const playPlayerTurn = (step, spell, isHard = false) => {
  // console.log('-- Player turn --', spell.name);

  const res = JSON.parse(JSON.stringify(step));

  if (isHard) {
    res.player.hit_points--;
  }

  if (res.player.hit_points <= 0) {
    return res;
  }

  // active spells
  for (const key in step.activeSpells) {
    if (step.activeSpells[key] === 1) {
      delete res.activeSpells[key];
    } else if (step.activeSpells[key] > 1) {
      res.activeSpells[key] = step.activeSpells[key] - 1;
    }
    const s = SPELLS[key];
    res.boss.hit_points -= s.damage;
    res.player.mana += s.mana;

    // boss is dead
    if (res.boss.hit_points <= 0) {
      return res;
    }
  }

  // cast spell
  res.manaSpent += spell.cost;
  res.player.mana -= spell.cost;
  if (spell.duration > 0) {
    // it's an active spell
    res.activeSpells[spell.name] = spell.duration;
  } else {
    // it's an immediate spell
    res.boss.hit_points -= spell.damage;
    res.player.hit_points += spell.heal;
  }

  return res;
};

const playBossTurn = (step) => {
  // console.log('-- Boss turn --');

  const res = JSON.parse(JSON.stringify(step));

  let playerTmpArmor = 0;

  // active spells
  for (const key in step.activeSpells) {
    if (step.activeSpells[key] === 1) {
      delete res.activeSpells[key];
    } else if (step.activeSpells[key] > 1) {
      res.activeSpells[key] = step.activeSpells[key] - 1;
    }
    const s = SPELLS[key];
    res.boss.hit_points -= s.damage;
    res.player.mana += s.mana;
    playerTmpArmor += s.armor;

    // boss is dead
    if (res.boss.hit_points <= 0) {
      return res;
    }
  }

  // boss attacks
  res.player.hit_points -= Math.max(
    1,
    res.boss.damage - res.player.armor - playerTmpArmor
  );

  return res;
};

const calcSolution = (input, playerStart, isHard = false) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const boss = { ...parsedInput };
  // console.log(boss, playerStart);

  // console.log(spells);

  const queue = [];

  queue.push({
    player: { ...playerStart },
    boss: { ...boss },
    activeSpells: {},
    manaSpent: 0,
  });

  // console.log(queue);

  while (queue.length) {
    const step = queue.shift();
    // console.log('start', step);

    // pick next spell
    for (const s in SPELLS) {
      const spell = SPELLS[s];
      // console.log('spell', spell);

      // You cannot cast a spell that would start an effect which is already active. However, effects can be started on the same turn they end.
      if (step.activeSpells[spell.name] && step.activeSpells[spell.name] > 1) {
        continue;
      }

      // You must have enough mana to cast a spell
      if (spell.cost > step.player.mana) {
        continue;
      }

      // player turn
      const res1 = playPlayerTurn(step, spell, isHard);
      // console.log('res1', res1);

      // player is dead
      if (res1.player.hit_points <= 0) {
        continue;
      }

      // boss is dead
      if (res1.boss.hit_points <= 0) {
        return res1.manaSpent;
      }

      // boss turn
      const res2 = playBossTurn(res1);
      // console.log('res2', res2);

      // boss is dead
      if (res2.boss.hit_points <= 0) {
        return res2.manaSpent;
      }

      // player is dead
      if (res2.player.hit_points <= 0) {
        continue;
      }

      // take another turn
      queue.push({
        player: { ...res2.player },
        boss: { ...res2.boss },
        activeSpells: { ...res2.activeSpells },
        manaSpent: res2.manaSpent,
      });
    }
  }

  return 'error';
};

const tests = [
  {
    inp: `
Hit Points: 13
Damage: 8
`,
    player: {
      hit_points: 10,
      mana: 250,
      armor: 0,
    },
    isHard: false,
    out: 226,
  },
  {
    inp: `
Hit Points: 14
Damage: 8
`,
    player: {
      hit_points: 10,
      mana: 250,
      armor: 0,
    },
    isHard: false,
    out: 641,
  },
];

tests.forEach(({ inp, player, isHard, out }) => {
  const res = calcSolution(inp, player, isHard);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(
  'easy',
  calcSolution(
    input,
    {
      hit_points: 50,
      mana: 500,
      armor: 0,
    },
    false
  )
);

console.log(
  'hard',
  calcSolution(
    input,
    {
      hit_points: 50,
      mana: 500,
      armor: 0,
    },
    true
  )
);
