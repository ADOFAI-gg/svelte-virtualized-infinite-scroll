import { cssModules, linearPreprocess } from 'svelte-preprocess-cssmodules';
import preprocess from 'svelte-preprocess';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: linearPreprocess([
    preprocess.typescript(),
    preprocess.scss(),
    cssModules(),
  ]),
};
