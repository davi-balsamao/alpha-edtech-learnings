const MAX_X = 17; 
const MAX_Y = 4;

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
            logEvent("💀 Personagem morto.");
            return false;
        }
        return true;
    }

    forward() {
        if (!this._estaVivo()) return;
        if (this._y < MAX_Y) {
            this._y++;
            logEvent(`Frente (Y=${this._y})`);
        } else {
            logEvent("🚫 Bloqueado: Topo do mapa.");
        }
    }

    back() {
        if (!this._estaVivo()) return;
        if (this._y > 0) {
            this._y--;
            logEvent(`Trás (Y=${this._y})`);
        } else {
            logEvent("🚫 Bloqueado: Base do mapa.");
        }
    }

    right() {
        if (!this._estaVivo()) return;
        if (this._x < MAX_X) {
            this._x++;
            logEvent(`Direita (X=${this._x})`);
        } else {
            logEvent("🚫 Bloqueado: Limite direito.");
        }
    }

    left() {
        if (!this._estaVivo()) return;
        if (this._x > 0) {
            this._x--;
            logEvent(`Esquerda (X=${this._x})`);
        } else {
            logEvent("🚫 Bloqueado: Limite esquerdo.");
        }
    }

    addCoin() {
        if (!this._estaVivo()) return;
        this._coins++;
        logEvent(`💰 Moeda! Total: ${this._coins}`);
    }

    attack() {
        if (!this._estaVivo()) return 0;
        logEvent(`⚔️ Soco básico! Dano: ${this._damage}`);
        return this._damage;
    }

    receiveDamage(dano) {
        if (this._hp <= 0) return;
        this._hp -= dano;
        if (this._hp < 0) this._hp = 0;
        
        logEvent(`💔 Recebeu ${dano} dano. HP: ${this._hp}`);
        if (this._hp === 0) {
            logEvent("💀 GAME OVER");
            document.getElementById('avatarIcon').classList.add('avatar-dead');
        }
    }
}

class Cowboy extends Avatar {
    constructor(x, y) {
        super(x, y);
        this._ammo = 10;
        this._damage = 2;
    }

    get resource() { return this._ammo; }

    attack() {
        if (!this._estaVivo()) return 0;
        if (this._ammo > 0) {
            this._ammo--;
            logEvent(`🤠 Tiro! Dano: ${this._damage}. Balas: ${this._ammo}`);
            return this._damage;
        } else {
            logEvent("⚠️ Sem munição!");
            return 0;
        }
    }

    addAmmo() {
        if (!this._estaVivo()) return;
        this._ammo++;
        logEvent(`🔫 Achou munição! Total: ${this._ammo}`);
    }
}

class Mago extends Avatar {
    constructor(x, y) {
        super(x, y);
        this._spells = 10;
        this._damage = 3;
        this._recovering = false;
    }

    get resource() { return this._spells; }

    attack() {
        if (!this._estaVivo()) return 0;
        if (this._spells > 0) {
            this._spells--;
            logEvent(`🧙‍♂️ Magia! Dano: ${this._damage}. Mana: ${this._spells}`);
            
            if (this._spells === 0 && !this._recovering) {
                this.iniciarRecuperacao();
            }
            return this._damage;
        } else {
            logEvent("⚠️ Sem mana!");
            return 0;
        }
    }

    iniciarRecuperacao() {
        this._recovering = true;
        logEvent("⏳ Mana zerada! Restaurando em 10s...");
        setTimeout(() => {
            if (this._hp > 0) {
                this._spells = 10;
                this._recovering = false;
                logEvent("✨ Mana cheia!");
            }
        }, 10000);
    }
}
let player = null; 

// Elementos
const selectClass = document.getElementById('selectClass');
const btnSpecial = document.getElementById('btnSpecial');
const elAvatarIcon = document.getElementById('avatarIcon');
const lblResource = document.getElementById('lblResource');
const elResource = document.getElementById('displayResource');
const logContainer = document.getElementById('gameLog');
const elHP = document.getElementById('displayHP');
const elCoins = document.getElementById('displayCoins');
const elPos = document.getElementById('displayPos');

function initGame() {
    const tipo = selectClass.value;
    
    elAvatarIcon.classList.remove('avatar-dead');
    logContainer.innerHTML = '';
    
    if (tipo === 'cowboy') {
        player = new Cowboy(0, 0);
        elAvatarIcon.innerText = "🤠";
        lblResource.innerText = "Munição";
        btnSpecial.classList.remove('hidden');
        btnSpecial.innerText = "➕ Munição";
        btnSpecial.onclick = () => player.addAmmo();
        logEvent("Classe: Cowboy");
    } 
    else if (tipo === 'mago') {
        player = new Mago(0, 0);
        elAvatarIcon.innerText = "🧙‍♂️";
        lblResource.innerText = "Feitiços";
        btnSpecial.classList.add('hidden');
        logEvent("Classe: Mago");
    } 
    else {
        // AVATAR COMUM
        player = new Avatar(0, 0);
        elAvatarIcon.innerText = "😐";
        lblResource.innerText = "-"; 
        elResource.innerText = "--";
        btnSpecial.classList.add('hidden');
        logEvent("Classe: Avatar Comum");
    }

    atualizarHUD();
}

setInterval(() => { if (player) atualizarHUD(); }, 100);

function atualizarHUD() {
    elHP.innerText = player.hp;
    elCoins.innerText = player.coins;
    elPos.innerText = `${player.x}, ${player.y}`;
    elHP.className = player.hp <= 3 ? "value hp-low" : "value hp-full";

    if (player instanceof Cowboy || player instanceof Mago) {
        elResource.innerText = player.resource;
    } else {
        elResource.innerText = "--";
    }

    elAvatarIcon.style.bottom = (player.y * 40) + 'px';
    elAvatarIcon.style.left = (player.x * 40) + 'px';
}

function logEvent(msg) {
    const p = document.createElement('p');
    p.innerText = `> ${msg}`;
    logContainer.prepend(p); // add no topo
}

document.getElementById('btnForward').onclick = () => player.forward();
document.getElementById('btnBack').onclick = () => player.back();
document.getElementById('btnLeft').onclick = () => player.left();
document.getElementById('btnRight').onclick = () => player.right();
document.getElementById('btnAction1').onclick = () => player.addCoin();
document.getElementById('btnAttack').onclick = () => player.attack();
document.getElementById('btnDamage').onclick = () => player.receiveDamage(2);
document.getElementById('btnReset').onclick = initGame;
selectClass.onchange = initGame;

window.onload = initGame;