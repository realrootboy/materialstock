const swaggerOptions = {
  swaggerDefinition: {
      info: {
          title:'MaterialStock API0',
          version: '1.0',
          description: 'API para controle e gestão de empresas de locação.'
      },    
  },
  apis: ['./controllers/*'],
  tags:[{
    name: "Costumers",
    summary: "All about costumes",
  },
  {
    name: "Employees",
    summary: "All about employees",
  },
  {
    name: "Lease object",
    summary: "All about employees",
  },
  {
    name: "Lease",
    summary: "All about employees",
  },
  {
    name: "Material",
    summary: "All about employees",
  }],
}
module.exports = swaggerOptions;