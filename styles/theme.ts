export const headerHeight = {
  mobile: 120,
  desktop: 179,
};

export const colors = {
  cheese: {
    100: '#ffff86',
    150: '#FFDF8D',
    200: '#ffda54',
    300: '#c9a91d',
  },
  tomato: {
    500: '#CC4443',
    700: '#ff0144',
  },
  gray: {
    background: '#F5F5F5',
    light: '#C4C4C4',
    medium: '#999999',
    dark: '#3D3431',
  },
  background: {
    light: '#F5F5F5',
    dark: '#EEEDED',
    brown: '#3D3431',
  },
};

export const styles = {
  global: {
    'html, body': {
      height: '100%',
      padding: 0,
      margin: 0,
      backgroundColor: 'white',
    },
    '#__next': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '.header': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'tomato.500',
      borderBottomWidth: '2px',
      borderColor: 'gray.dark',
      zIndex: 1000,
      background: 'url("/assets/header-bg.png") repeat',
      backgroundSize: '170px',
      backgroundPosition: 'center bottom',
    },
    '.header .header-content': {
      flex: 1,
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    '.header .logo': {
      maxHeight: `${headerHeight.desktop}px`,
      width: 'auto',
    },
    '.menu a': {
      color: 'white',
      padding: '0 0 7px',
      position: 'relative',
      fontSize: '18px',
      fontWeight: '900',
      width: 'max-content',
      whiteSpaceWrap: 'nowrap',
    },
    '.menu--row a': {
      fontSize: '14px',
    },
    '.menu a:hover, .menu a.current': {
      color: 'cheese.200',
      textDecoration: 'none',
    },
    '.menu a::after': {
      width: 0,
      height: '4px',
      content: '""',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 0,
      background: '#ffda54',
      transition: 'all .3s ease-in-out',
    },
    '.menu a:hover::after, .menu a.current::after': {
      width: '100%',
    },
    '.footer a': {
      color: 'white',
      padding: '0 0 7px',
      position: 'relative',
      fontSize: '18px',
      fontWeight: '900',
      width: 'max-content',
      whiteSpaceWrap: 'nowrap',
    },
    '.footer a:hover, .footer a.current': {
      color: 'cheese.200',
      textDecoration: 'none',
    },
    '.footer a::after': {
      width: 0,
      height: '4px',
      content: '""',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 0,
      background: '#ffda54',
      transition: 'all .3s ease-in-out',
    },
    '.footer a:hover::after, .footer a.current::after': {
      width: '100%',
    },
    a: {
      color: 'cheese.200',
      _hover: {
        color: 'cheese.300',
        textDecoration: 'underline',
      },
    },
    '.mobile-nav-item': {
      color: 'white',
      fontWeight: 400,
      fontSize: '24px',
    },
    '.footer': {
      display: 'flex',
      flexDirection: 'row',
      height: '530px',
      backgroundColor: 'gray.dark',
      zIndex: 1000,
      padding: 10,
    },
    '.footer .footer-content': {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    '.card': {
      width: 'full',
      borderRadius: '10px',
    },
    '.card_subtext': {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '30px',
    },
    '.tomato-btn': {
      color: 'tomato.500',
      background: '#ffda54',
      border: '1px',
    },
    '.tomato-btn img:hover': {
      background: 'gray.dark',
    },
    '.cave-nav-btn': {
      color: 'gray.dark',
      border: '1px',
      margin: 2,
    },
    '.cave-nav-btn-selected': {
      color: '#FFD232',
      background: '#3D3431',
      border: '1px',
      margin: 2,
    },
    '.artist-card': {
      color: 'tomato.500',
      border: '1px',
      borderRadius: '10px',
      padding: '20px',
    },
    // '.black-nav': {
    //   color: 'gray.dark',
    //   border
    // },
  },
};
