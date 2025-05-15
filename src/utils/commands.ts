import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  hostname: () => hostname,
  whoami: () => 'guest',
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'vim'`,
  vim: () => `That's the way you code!`,
  emacs: () => `why use emacs? try 'vim'`,
  echo: (args: string[]) => {
    if (args.length == 2 && args[0] == '<') {
      if (args[1] == 'foobar') {
        return 'come on, read me with cat.'
      }
      if (args[1] == 'deep_dark_secret') {
        return `bash: deep_dark_secret: Permission denied (try run with 'sudo')`
      }
    }
    return args.join(' ')
  },
  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  ls: (args: string[]) => {
    return `----------   1  lzs  lzs  114514 Oct 22 00:01 deep_dark_secret
-rw-r--r--   6  lzs  lzs 1919810 May 15 23:20 foobar`
  },
  repo: () => {
    window.open(packageJson.repository.url, '_blank');

    return 'Opening repository...';
  },
  clear: () => {
    history.set([]);

    return '';
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);

    return `Opening mailto:${packageJson.author.email}...`;
  },
  weather: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return 'Usage: weather [city]. Example: weather Brussels';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return 'curl: no URL provided';
    }

    let url = args[0];
    if (!/^https?:\/\//.test(url)) {
      url = `https://${url}`;
    }
    url = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: () => `
    ███╗   ███╗██╗   ██╗███████╗███████╗██╗     ███████╗
    ████╗ ████║╚██╗ ██╔╝██╔════╝██╔════╝██║     ██╔════╝
    ██╔████╔██║ ╚████╔╝ ███████╗█████╗  ██║     █████╗  
    ██║╚██╔╝██║  ╚██╔╝  ╚════██║██╔══╝  ██║     ██╔══╝  
    ██║ ╚═╝ ██║   ██║   ███████║███████╗███████╗██║     
    ╚═╝     ╚═╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝      v${packageJson.version}

Type 'help' to see list of available commands.
`,
  cat: (args: string[]) => {
    if (args.length > 0 && (args[0] == 'deep_dark_secret' || args[0] == './deep_dark_secret')) {
      return `cat: ${args[0]}: Permission denied (try run with 'sudo')`
    }
    window.open("https://cataas.com/cat")
    return "CAT stands for Cute And Troubleful instead of conCATenate."
  },
  dify: () => {
    window.open("https://dify.liuzisen.com/")
    return ''
  },
  minio: () => {
    window.open('https://minio.liuzisen.com/')
    return ''
  },
  cv: () => {
    window.open('https://s3.liuzisen.com/public/zisen_liu_ai_platform.pdf')
    return ''
  },
};
