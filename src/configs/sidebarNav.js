import 'boxicons'

const sidebarNav = [
    {
        link: '/',
        section: 'dashboard',
        icon: <i className='bx bx-home-alt'></i>,
        text: 'Dashboard'
    },
    {
        link: '/nano',
        section: 'nano',
        icon: <i className='bx bx-line-chart'></i>,
        text: 'Nano precise'
    },
    {
        link: '/ports',
        section: 'Ports',
        icon: <i class='bx bxs-dashboard'></i>,
        text: 'Ports'
    },
    {
        link: '/imageTemp',
        section: 'imageTemperature',
        icon: <i className='bx bx-image-alt'></i>,
        text: 'Image'
    },
    {
        link: '/reports',
        section: 'reports',
        icon: <i className='bx bx-cube'></i>,
        text: 'Reports'
    },
    {
        link: '/settings',
        section: 'settings',
        icon: <i className='bx bx-cog'></i>,
        text: 'Settings'
    }
]

export default sidebarNav