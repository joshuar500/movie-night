const trackTime = {
    currentTime: 0,
    start: function() {
        const self = this;
        this.interval = setInterval(function(){
            self.currentTime += 1;
        }, 1000);
    },
    stop: function() {
        clearInterval(this.interval);
        this.interval = null;
    }
};

module.exports = trackTime;