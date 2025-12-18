const MAX_Y = 4;
const MAX_X = 14; 

class Avatar {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._coins = 0;
        this._hp = 10;
        this._damage = 1;
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get coins() { return this._coins; }
    get hp() { return this._hp; }

    _estaVivo() {
        if (this._hp <= 0) {
            logEvent("💀 Ação bloqueada: O Avatar morreu.");
            return false;
        }
        return true;
    }


    forward() {
        if (!this._estaVivo()) return;

        if (this._y < MAX_Y) {
            this._y++;
            logEvent(`Frente. Posição: (${this._x}, ${this._y})`);
        } else {
            logEvent("🚫 Bloqueado: Limite superior do mapa.");
        }
    }

    back() {
        if (!this._estaVivo()) return;

        if (this._y > 0) {
            this._y--;
            logEvent(`Trás. Posição: (${this._x}, ${this._y})`);
        } else {
            logEvent("🚫 Bloqueado: Limite inferior (0).");
        }
    }

    right() {
        if (!this._estaVivo()) return;

        if (this._x < MAX_X) {
            this._x++;
            logEvent(`Direita. Posição: (${this._x}, ${this._y})`);
        } else {
            logEvent("🚫 Bloqueado: Limite direito do mapa.");
        }
    }

    left() {
        if (!this._estaVivo()) return;

        if (this._x > 0) {
            this._x--;
            logEvent(`Esquerda. Posição: (${this._x}, ${this._y})`);
        } else {
            logEvent("🚫 Bloqueado: Limite esquerdo (0).");
        }
    }


    addCoin() {
        if (!this._estaVivo()) return;
        this._coins++;
        logEvent(`💰 Moeda encontrada! Total: ${this._coins}`);
    }

    attack() {
        if (!this._estaVivo()) return 0;
        logEvent(`⚔️ Ataque realizado (Dano: ${this._damage})`);
        return this._damage;
    }

    receiveDamage(dano) {
        if (this._hp <= 0) return; 
        this._hp -= dano;
        if (this._hp < 0) this._hp = 0;
        
        logEvent(`💔 Dano recebido: ${dano}. Vida restante: ${this._hp}`);

        if (this._hp === 0) {
            logEvent("💀 GAME OVER: O Avatar morreu.");
            document.getElementById('avatar').classList.add('avatar-dead');
        }
    }
}


let player = new Avatar(0, 0);

const elHP = document.getElementById('displayHP');
const elCoins = document.getElementById('displayCoins');
const elPos = document.getElementById('displayPos');
const elAvatar = document.getElementById('avatar');
const elLog = document.getElementById('gameLog');

setInterval(atualizarHUD, 100);

function atualizarHUD() {
    elHP.innerText = player.hp;
    elCoins.innerText = player.coins;
    elPos.innerText = `${player.x}, ${player.y}`;

    if (player.hp <= 3) elHP.className = "value hp-low";
    else elHP.className = "value hp-full";

    elAvatar.style.bottom = (player.y * 40) + 'px';
    elAvatar.style.left = (player.x * 40) + 'px';
}

function logEvent(msg) {
    const p = document.createElement('p');
    p.innerText = `> ${msg}`;
    elLog.prepend(p);
}

document.getElementById('btnForward').onclick = () => player.forward();
document.getElementById('btnBack').onclick = () => player.back();
document.getElementById('btnLeft').onclick = () => player.left();
document.getElementById('btnRight').onclick = () => player.right();
document.getElementById('btnCoin').onclick = () => player.addCoin();
document.getElementById('btnAttack').onclick = () => player.attack();
document.getElementById('btnDamage').onclick = () => player.receiveDamage(2);

document.getElementById('btnReset').onclick = () => {
    player = new Avatar(0, 0);
    elAvatar.classList.remove('avatar-dead');
    elLog.innerHTML = '<p>> Jogo reiniciado.</p>';
};