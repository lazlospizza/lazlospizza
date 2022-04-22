export const colors = {
  bellpepper: {
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
      zIndex: 1000,
    },
    '.header .header-content': {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: 4,
    },
    '.header .logo': {
      height: '159px',
      width: 'auto',
    },
    a: {
      color: 'bellpepper.200',
      _hover: {
        color: 'bellpepper.300',
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
      // padding: '20px',
      borderRadius: '10px',
    },
    '.card_subtext': {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '30px',
    },
  },
};
