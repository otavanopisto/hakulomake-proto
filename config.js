module.exports = {
  port: 3000,
  server_root: '/',
  session_secret: 'ok1h34iou54h198h90fh1q890123f8j902',
  mail: {
    api_key: '',
    domain: '',
    sender: 'kesatyo'
  },
  database: {
    host: 'localhost',
    table: 'sjapplication'
  },
  positions: [
    {department: 'Konsernipalvelut', jobs: [
      {name: 'Asiointipiste', code: 'asiointipiste'},
      {name: 'Ruoka- ja puhtauspalvelut', code: 'ruoka'},
      {name: 'Ympäristöpalvelut', code: 'ymparistopalvelut'},
      {name: 'Terveysvalvonta', code: 'terveysvalvonta'},
      {name: 'Tukitehtävät (raivaus- ym.)', code: 'tuki'},
      {name: 'Opastustehtävät', code: 'opastustehtavat'}
    ]},
    {department: 'Sivistystoimi', jobs: [
      {name: 'Nuoriso', code: 'nuoriso'},
      {name: 'Liikunta, ulkoilualueet, kentät, jäähalli', code: 'liikuntaulkoilu'},
      {name: 'Liikunta, uimakoulut ja urheilukoulut', code: 'liikuntakoulut'},
      {name: 'Kirjasto', code: 'kirjasto'},
      {name: 'Varhaiskasvatus / päivähoito', code: 'varhaiskasvatus'},
      {name: 'Kulttuuri', code: 'kulttuuri'}
    ]},
    {department: 'Sosiaali- ja terveystoimi', jobs: [
      {name: 'Piristyspartiot / vanhusten palvelut', code: 'piristys'},
      {name: 'Akuuttiosastot', code: 'akuuttiosastot'},
      {name: 'Terveyspalvelut hallinto', code: 'terveyshallinto'},
      {name: 'Mielenterveys- ja päihdepalvelut', code: 'mielenterveys'}
    ]},
    {department: 'Tekninen toimi', jobs: [
      {name: 'Mittaus- ja kiinteistöt', code: 'mittaus'},
      {name: 'Asuntomessut / opastehtävät', code: 'asuntomessut'}
    ]},
    {department: 'YIT Kuntatekniikka Oy', jobs: [
      {name: 'Puisto- ja puhtaanapitotyöt', code: 'puisto'},
    ]},
    {department: 'Viherpalvelut Hyvönen Oy', jobs: [
      {name: 'Puisto - ja puhtaanapitotyöt / keskustan alue', code: 'puistokeskusta'},
    ]},
    {department: 'Yhdyskuntatekniikka ja ympäristö', jobs: [
      {name: 'Puisto- ja puhtaanapitotyöt / Ristiina', code: 'puistoristiina'},
    ]}
  ]
};