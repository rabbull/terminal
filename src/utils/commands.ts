import packageJson from '../../package.json';
import { history } from '../stores/history';

const hostname = window.location.hostname;

const whoami = 'Zisen Liu (刘子森), MSc student @ University of Zurich'

const open = function(url: string) {
  window.open(url)
  return `Openning ${url}...`
}

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: \n\t' + Object.keys(commands).join(', \n\t'),
  email: () => open(`mailto:${packageJson.author.email}`),
  linkedin: () => open('https://linkedin.com/in/zisen-liu/'),
  github: () => open('https://github.com/rabbull/'),
  cv: () => open('https://s3.liuzisen.com/public/zisen_liu_ai_platform.pdf'),

  toolbox: (args: string[]) => {
    let tools: Record<string, (args: string[]) => Promise<string> | string> = {
      'dify': () => open('https://dify.liuzisen.com/'),
      'minio': () => open('https://minio.liuzisen.com/'),
      'overleaf': () => open('https://overleaf.liuzisen.com/'),
      'weather': async (args: string[]) => {
        const city = args.join('+');
    
        if (!city) {
          return 'Usage: weather [city]. Example: weather Brussels';
        }
    
        const weather = await fetch(`https://wttr.in/${city}?ATm`);
    
        return weather.text();
      },
    }
    if (args.length < 1) {
      return `Usage: toolbox TOOL

Avaliable tools:\n\t` + Object.keys(tools).join('\n\t')
    }
    let tool = args[0];
    if (tool in tools) {
      return tools[tool](args.slice(1));
    }
    return `toolbox: unknown tool: ${tool}`
  },

  hostname: () => hostname,
  whoami: () => whoami,
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
  ls: () => {
    return `----------   1  lzs  lzs  114514 Oct 22 00:01 deep_dark_secret
-rw-r--r--   6  lzs  lzs 1919810 May 15 23:20 foobar`
  },
  clear: () => {
    history.set([]);
    return '';
  },
  exit: () => 'Please close the tab to exit.',
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
  cat: (args: string[]) => {
    if (args.length > 0 && (args[0] == 'deep_dark_secret' || args[0] == './deep_dark_secret')) {
      return `cat: ${args[0]}: Permission denied (try run with 'sudo')`
    }
    window.open("https://cataas.com/cat")
    return "CAT stands for Cute And Troubleful instead of conCATenate."
  },
  banner: () => `
  ███╗   ███╗██╗   ██╗███████╗███████╗██╗     ███████╗
  ████╗ ████║╚██╗ ██╔╝██╔════╝██╔════╝██║     ██╔════╝
  ██╔████╔██║ ╚████╔╝ ███████╗█████╗  ██║     █████╗  
  ██║╚██╔╝██║  ╚██╔╝  ╚════██║██╔══╝  ██║     ██╔══╝  
  ██║ ╚═╝ ██║   ██║   ███████║███████╗███████╗██║     
  ╚═╝     ╚═╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝      v${packageJson.version}


  Hi! I'm ${whoami}.
  
  Welcome to my homepage.
  Please feel free to explore around. 
  Type 'help' to see list of available commands.

`,
};
