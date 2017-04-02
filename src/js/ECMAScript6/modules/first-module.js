class ShareButtons {
    constructor() {
        $('body')
            .on('click', (e) => {
                const target = $(e.target);
                console.log('fsdf');
            });
    }
}