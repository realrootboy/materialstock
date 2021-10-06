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
    description: "All about costumes",
  },
  {
    name: "Employees",
    description: "All about employees",
  },
  {
    name: "Lease object",
    description: "All about employees",
  },
  {
    name: "Lease",
    description: "All about employees",
  },
  {
    name: "Material",
    description: "All about employees",
  }],
}
module.exports = swaggerOptions;