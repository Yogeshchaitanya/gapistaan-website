"""पन्ना पलटने की आवाज़ें (synth, कोई copyright नहीं)। चलाएँ: python3 make_sounds.py"""
import numpy as np, wave, subprocess, pathlib
SR = 44100
rng = np.random.default_rng(7)

def bandnoise(n, lo, hi):
    x = rng.standard_normal(n)
    X = np.fft.rfft(x); f = np.fft.rfftfreq(n, 1/SR)
    X *= ((f > lo) & (f < hi)) * (1/np.sqrt(np.maximum(f, 50)/50))
    return np.fft.irfft(X, n)

def env(n, pts):
    t = np.linspace(0, 1, n); return np.interp(t, [p[0] for p in pts], [p[1] for p in pts])

def save(name, y):
    y = y / (np.abs(y).max() + 1e-9) * 0.85
    # छोटा room reverb
    ir = rng.standard_normal(int(SR*0.12)) * np.exp(-np.linspace(0, 9, int(SR*0.12))) * 0.08
    y = np.convolve(y, ir)[:len(y)+int(SR*0.1)] + np.pad(y, (0, int(SR*0.1)))
    y = y / np.abs(y).max() * 0.8
    pcm = (y * 32767).astype(np.int16)
    p = pathlib.Path('assets'); w = p / f'{name}.wav'
    with wave.open(str(w), 'wb') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR); f.writeframes(pcm.tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(w), '-c:a', 'libmp3lame', '-b:a', '96k', str(p / f'{name}.mp3')], check=True)
    w.unlink()

def page(dur=0.55, seed=0):
    n = int(SR*dur)
    # कागज़ उठने की हल्की चरमराहट + हवा में घूमने की सरसराहट + गिरने की थप
    crinkle = bandnoise(n, 2500, 9000) * env(n, [(0,0),(0.05,0.5),(0.2,0.25),(0.5,0.08),(1,0)])
    crinkle *= (rng.random(n) > 0.6) * 1.6 + 0.4
    swish = bandnoise(n, 400, 5000) * env(n, [(0,0),(0.15,0.4),(0.45,1),(0.7,0.35),(1,0)])
    flap = bandnoise(n, 120, 900) * env(n, [(0,0),(0.68,0),(0.74,0.9),(0.85,0.15),(1,0)])
    return crinkle*0.5 + swish + flap*0.7

save('page-flip', page())
n = int(SR*0.7)
thud = np.sin(2*np.pi*np.cumsum(np.interp(np.arange(n), [0, n], [140, 60]))/SR) * env(n, [(0,0),(0.62,0),(0.64,1),(0.8,0.2),(1,0)])
save('cover-flip', page(0.7)*0.6 + thud*0.9 + bandnoise(n, 80, 400)*env(n, [(0,0),(0.62,0),(0.65,0.8),(0.9,0)]))
print('ok')
