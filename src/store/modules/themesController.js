


// Here contains everybody configuration theme of application
const themescontroller = {
    state: () => ({
        currTheme: 'default',
        themeSchemaDefault: { // schema defined by view as object // it's will to use in after upgraded
            textcolor: '#999', // contrast white for it
            backmessage: '#1e1c1cc6', // background-color for message
            vlonline: '#1e1c1cc6', // color for value inline/offline
            backnavigation: '#1e1c1cc6', // background color for items of navigation bar
            vlcheck: '#1e1c1cc6', // color for value check (mail, new message)
            backborder: '#1e1c1cc6', // back color for all border a application
            otherthings: '#1e1c1cc6', // back or border color for other things
            classNavObject: {'item-selected' : {
                'background-color': '#007e7a !important;',
                'border-left': '10px solid wheat;'
            }}
        },
        themeSchemaTeal: { // schema defined by view as object // it's will to use in after upgraded
            textcolor: 'white', // contrast white for it
            backmessage: 'teal', // background-color for message
            vlonline: 'teal', // color for value inline/offline
            backnavigation: 'teal', // background color for items of navigation bar
            vlcheck: 'teal', // color for value check (mail, new message)
            backborder: 'teal', // back color for all border a application
            otherthings: 'teal', // back or border color for other things
        },
        themeSchemaGreen: { // schema green of color by view as object // it's will to use in after upgraded
            textcolor: 'white', // no contrast white for it / only 50% of contrast by color white
            backmessage: '#00ff158e', // background-color for message
            vlonline: '#00ff158e', // color for value inline/offline
            backnavigation: '#00ff158e', // background color for items of navigation bar
            vlcheck: '#00ff158e', // color for value check (mail, new message)
            backborder: '#00ff158e', // back color for all border a application
            otherthings: '#00ff158e', // back or border color for other things
        },
        themeSchemaOrange: { // schema green of color by view as object // it's will to use in after upgraded
            textcolor: 'white', // no contrast white for it / only 50% of contrast by color white
            backmessage: '#ff5900', // background-color for message
            vlonline: '#ff5900', // color for value inline/offline
            backnavigation: '#ff5900', // background color for items of navigation bar
            vlcheck: '#ff5900', // color for value check (mail, new message)
            backborder: '#ff5900', // back color for all border a application
            otherthings: '#ff5900', // back or border color for other things
        },
        themeSchemaFeolet: { // schema green of color by view as object // it's will to use in after upgraded
            textcolor: 'white', // no contrast white for it / only 50% of contrast by color white
            backmessage: '#e100ff8e', // background-color for message
            vlonline: '#e100ff8e', // color for value inline/offline
            backnavigation: '#e100ff8e', // background color for items of navigation bar
            vlcheck: '#e100ff8e', // color for value check (mail, new message)
            backborder: '#e100ff8e', // back color for all border a application
            otherthings: '#e100ff8e', // back or border color for other things
        },
        themeSchemaRed: { // schema green of color by view as object // it's will to use in after upgraded
            textcolor: 'white', // no contrast white for it / only 50% of contrast by color white
            backmessage: '#ff0000c6', // background-color for message
            vlonline: '#ff0000c6', // color for value inline/offline
            backnavigation: '#ff0000c6', // background color for items of navigation bar
            vlcheck: '#ff0000c6', // color for value check (mail, new message)
            backborder: '#ff0000c6', // back color for all border a application
            otherthings: '#ff0000c6', // back or border color for other things
        },
    }),
    mutations: {
        changeTheme(st, vl) {
            st.currTheme = vl
        },
    },
    actions: {
        configuration({st}, localStorageLink) {
            if
            (
                localStorageLink.getItem('theme-schema') === 'default' 
                &&
                st.currTheme === 'default'
            )
            {
                console.log('theme/default', st.currTheme)
            }
        },
    },
    getters: {

    },
    namespaced: true,

}





export default themescontroller