export const colors = {
  cheese: {
    100: '#ffff86',
    200: '#ffda54',
    300: '#c9a91d',
  },
  tomato: {
    500: '#CC4443',
  },
  gray: {
    light: '#C4C4C4',
    medium: '#999999',
    dark: '#3D3431',
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
    '#__next::before': {
      content: '""',
      minHeight: '159px',
      maxHeight: '159px',
      width: '100%',
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
      borderColor: '#3D3431',
      zIndex: 1000,
    },
    '.header .header-content': {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      padding: 4,
    },
    '.header .logo': {
      height: '159px',
      width: 'auto',
    },
    '.header .menu a': {
      color: 'white',
      padding: '0 0 7px',
      position: 'relative',
      fontSize: '18px',
      fontWeight: '900',
      marginRight: 6,
      marginLeft: 1,
    },
    '.header .menu a:hover, .header .menu a.current': {
      color: 'cheese.200',
      textDecoration: 'none',
    },
    '.header .menu a::after': {
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
    '.header .menu a:hover::after, .header .menu a.current::after': {
      width: '100%',
    },
    a: {
      color: 'cheese.200',
      _hover: {
        color: 'cheese.300',
        textDecoration: 'underline',
      },
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
      marginRight: 5,
    },
    '.cave-nav-btn-selected': {
      color: '#FFD232',
      background: '#3D3431',
      border: '1px',
      marginRight: 5,
    },
    '.artist-card': {
      color: 'tomato.500',
      border: '1px',
      borderRadius: '10px',
      padding: '20px',
    },
  },
};
