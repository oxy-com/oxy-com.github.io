const serviceRoot = 'https://aliconnect.nl/v1';
Web.on('loaded', (event) => Abis.config({serviceRoot}).init().then(async (abis) => {
  const {config,Client,Prompt,Pdf,Treeview,Listview,Statusbar,XLSBook,authClient,abisClient,socketClient,tags,treeview,listview,account,Aliconnect,getAccessToken} = abis;
  const {num} = Format;
  const url = new URL(document.location);
  const {client_id,forms,costs,info} = config;
  console.debug(1);

  Web.treeview.append([
    {
      name: 'Controls',
      icn: 'organization',
      children: [
        {
          name: 'OxyControl',
          $path: serviceRoot + '/oxycontrol',
          $search: '',
          $top: 2000,
        },
      ],
    },
  ]);


}, err => {
  console.error(err);
  $(document.body).append(
    $('div').text('Deze pagina is niet beschikbaar'),
  )
}));
