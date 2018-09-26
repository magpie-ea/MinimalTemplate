import { intro, instructions, practice, beginMainExp, main, postTest, thanks } from '../../views/views.js'

// customize the experiment by specifying a view order and a trial structure
export let customize = {
    // specify view order
    views_seq: [
        intro,
        instructions,
        // loop([intro,
        // instructions], 2),
        practice,
        beginMainExp,
        main,
        /*loop([practice,
        beginMainExp,
        main], 2),*/
        postTest,
        thanks
    ],

    // adds progress bars to the views listed
    // view's name is the same as object's name
    progress_bar_in: ["intro", "instructions", "main"],
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    progress_bar_style: "default",
    // the width of the progress bar or a single chunk
    progress_bar_width: 100
};