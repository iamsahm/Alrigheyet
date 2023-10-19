window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Bar {
        constructor(x, y, width, height, color, index) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index = index;
        }
        update(micInput) {
            const sound = micInput * 1000;
            if (sound > this.height) {
                this.height = sound;
            } else {
                this.height -= this.height * 0.03;
            }
        }

        draw(ctx, volume) {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(this.index * 0.01);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.stroke();
            ctx.restore();
        }
    }

    class Microphone {
        constructor(fftSize) {
            this.initialized = false;
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    this.audioContext = new AudioContext();
                    this.microphone =
                        this.audioContext.createMediaStreamSource(stream);
                    this.analyser = this.audioContext.createAnalyser();
                    this.analyser.fftSize = fftSize;
                    const bufferLength = this.analyser.frequencyBinCount;
                    this.dataArray = new Uint8Array(bufferLength);
                    this.microphone.connect(this.analyser);
                    this.initialized = true;
                })
                .catch(function (err) {
                    alert(err);
                });
        }
        getSamples() {
            this.analyser.getByteTimeDomainData(this.dataArray);
            let normSamples = [...this.dataArray].map((x) => x / 128 - 1);
            return normSamples;
        }
        getVolume() {
            this.analyser.getByteTimeDomainData(this.dataArray);
            let normSamples = [...this.dataArray].map((x) => x / 128 - 1);
            let sum = 0;
            for (let i = 0; i < normSamples.length; i++) {
                sum += normSamples[i] * normSamples[i];
            }
            let volume = Math.sqrt(sum / normSamples.length);
            return volume;
        }
    }
    let fftSize = 512;
    const microphone = new Microphone(fftSize);
    let bars = [];
    let barWidth = canvas.width / (fftSize / 2);

    function createBars() {
        for (let i = 0; i < fftSize / 2; i++) {
            bars.push(new Bar(i * barWidth, 300, 0.5, 250, "red", i));
        }
    }

    createBars();

    function reaction() {
        if (microphone.initialized) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const samples = microphone.getSamples();
            bars.forEach((bar, i) => {
                bar.update(samples[i]);
                const volume = microphone.getVolume(i);
                bar.height = volume * canvas.height;
                bar.draw(ctx, 1);
            });
        }
        requestAnimationFrame(reaction);
    }
    reaction();
});
