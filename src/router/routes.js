const routes = [
    //主页
  {
    path:'/',
    name:'App',
  },

      /** user*/
    //log
    {
        path:'/user/log',
        name:'log',
        component:()=>import('../components/pages/user-service/log.vue')
    },
    //registry
    {
        path:'/user/registry',
        name:'registry',
        component:()=>import('../components/pages/user-service/registry.vue'),
    },


    /**statisticalAnalysis */
        //pageAnalyzeClient
    {
        path:'/statisticalAnalysis/pageAnalyzeClient',
        name:'pageAnalyzeClient',
        component:()=>import('../components/pages/statisticalAnalysis-service/pageAnalyzeClient.vue')
    },

    //pageClientChurnAnalysis
    {
        path:'/statisticalAnalysis/pageClientChurnAnalysis',
        name:'pageClientChurnAnalysis',
        component:()=>import('../components/pages/statisticalAnalysis-service/pageClientChurnAnalysis.vue')
    },

    //pageClientServiceAnalysis
    {
        path:'/statisticalAnalysis/pageClientServiceAnalysis',
        name:'pageClientServiceAnalysis',
        component:()=>import('../components/pages/statisticalAnalysis-service/pageClientServiceAnalysis.vue')
    },

    //pageStatisticalAnalysis
    {
        path:'/statisticalAnalysis/pageStatisticalAnalysis',
        name:'pageStatisticalAnalysis',
        component:()=>import('../components/pages/statisticalAnalysis-service/pageStatisticalAnalysis.vue')
    },


    /**clientPlan */
        //detailClientPlan
    {
        path:'/clientPlan/detailClientPlan',
        name:'detailClientPlan',
        component:()=>import('../components/pages/salesOpportunities-service/clientPlanManage/detailClientPlan.vue')
    },

    //detailClientPlan
    {
        path:'/clientPlan/pageClientPlan',
        name:'pageClientPlan',
        component:()=>import('../components/pages/salesOpportunities-service/clientPlanManage/pageClient.vue')
    },

    //updateClientPlan
    {
        path:'/clientPlan/updateClientPlan',
        name:'updateClientPlan',
        component:()=>import('../components/pages/salesOpportunities-service/clientPlanManage/updateClientPlan.vue')
    },


    /**salesOpportunities */
    //pageSales
  {
    path:'/salesOpportunities/pageSales',
    name:'pageSales',
    component:()=>import('../components/pages/salesOpportunities-service/pageSales.vue')
  },

  //createSales
  {
    path:'/salesOpportunities/createSales',
    name:'createSales',
    component:()=>import('../components/pages/salesOpportunities-service/createSales.vue')
  },

  //designateSale
  {
    path:'/salesOpportunities/designateSale',
    name:'designateSale',
    component:()=>import('../components/pages/salesOpportunities-service/designateSale.vue')
  },

  //updateSales
  {
    path:'/salesOpportunities/updateSales',
    name:'updateSales',
    component:()=>import('../components/pages/salesOpportunities-service/updateSales.vue')
  },


  /**dataBase */
      //pageInventoryInfo
    {
        path:'/dataBase/ProductInformation/pageInventoryInfo',
        name:'pageInventoryInfo',
        component:()=>import('../components/pages/dataBase-service/productInformationManage/pageInventoryInfo.vue')
    },
        //pageProductInfo
    {
        path:'/dataBase/InventoryInfo/pageProductInfo',
        name:'pageProductInfo',
        component:()=>import('../components/pages/dataBase-service/inventoryInfoManage/pageProductInfo.vue')
    },

        //pageDataDictionary
    {
        path:'/dataBase/DataDictionary/pageDataDictionary',
        name:'pageDataDictionary',
        component:()=>import('../components/pages/dataBase-service/dataDictionaryManage/pageDataDictionary.vue')
    },

    //createDataDictionary
    {
        path:'/dataBase/DataDictionary/createDataDictionary',
        name:'createDataDictionary',
        component:()=>import('../components/pages/dataBase-service/dataDictionaryManage/createDataDictionary.vue')
    },

    //updateDataDictionary
    {
        path:'/dataBase/DataDictionary/updateDataDictionary',
        name:'updateDataDictionary',
        component:()=>import('../components/pages/dataBase-service/dataDictionaryManage/updateDataDictionary.vue')
    },


    /**clientServer */
        //createClientServer
    {
        path:'/clientServer/createClientServer',
        name:'createClientServer',
        component:()=>import('../components/pages/clientServer-service/createClientServer.vue')
    },
    
    //pageClientServer
    {
        path:'/clientServer/pageClientServer',
        name:'pageClientServer',
        component:()=>import('../components/pages/clientServer-service/pageClientServer.vue')
    },

    //PageFeedBack
    {
        path:'/clientServer/PageFeedBack',
        name:'PageFeedBack',
        component:()=>import('../components/pages/clientServer-service/PageFeedBack.vue')
    },

    //PageProcessClientServer
    {
        path:'/clientServer/PageProcessClientServer',
        name:'PageProcessClientServer',
        component:()=>import('../components/pages/clientServer-service/PageProcessClientServer.vue')
    },

    //PageServiceArchive
    {
        path:'/clientServer/PageServiceArchive',
        name:'PageServiceArchive',
        component:()=>import('../components/pages/clientServer-service/PageServiceArchive.vue')
    },

    //ProcessingClientServer
    {
        path:'/clientServer/ProcessingClientServer',
        name:'ProcessingClientServer',
        component:()=>import('../components/pages/clientServer-service/ProcessingClientServer.vue')
    },

    //ProcessingFeedBack
    {
        path:'/clientServer/ProcessingFeedBack',
        name:'ProcessingFeedBack',
        component:()=>import('../components/pages/clientServer-service/ProcessingFeedBack.vue')
    },

    //ProcessingServiceArchive
    {
        path:'/clientServer/ProcessingServiceArchive',
        name:'ProcessingServiceArchive',
        component:()=>import('../components/pages/clientServer-service/ProcessingServiceArchive.vue')
    },

    /**client */
    //pageClients
    {
        path:'/client/pageClients',
        name:'pageClients',
        component:()=>import('../components/pages/client-service/pageClients.vue'),
    },
    //createClient
    {
        path:'/client/createClient',
        name:'createClient',
        component:()=>import('../components/pages/client-service/createClient.vue'),
    },
    //updateClient
    {
        path:'/client/updateClient',
        name:'updateClient',
        component:()=>import('../components/pages/client-service/updateClient.vue'),
    },
    {
        path:'/client/detailClient',
        name:'detailClient',
        component:()=>import('../components/pages/client-service/detailClient.vue')
    },


    /*liaison */
        //pageLiaison
    {
        path:'/client/liaison/pageLiaison',
        name:'pageLiaison',
        component:()=>import('../components/pages/client-service/clientLiaisonManage/pageLiaison.vue')
    },
    //createLiaison
    {
        path:'/client/liaison/createLiaison',
        name:'createLiaison',
        component:()=>import('../components/pages/client-service/clientLiaisonManage/createLiaison.vue')
    },
    //updateLiaison
    {
        path:'/client/liaison/updateLiaison',
        name:'updateLiaison',
        component:()=>import('../components/pages/client-service/clientLiaisonManage/updateLiaison.vue')
    },

    /*ClientLost */
        //pageClientLost
    {
        path:'/client/ClientLost/pageClientLost',
        name:'pageClientLost',
        component:()=>import('../components/pages/client-service/clientLostManage/pageClientLost.vue')
    },
    //confirmedLoss
    {
        path:'/client/ClientLost/confirmedLoss',
        name:'confirmedLoss',
        component:()=>import('../components/pages/client-service/clientLostManage/confirmedLoss.vue')
    },
    //deferredLoss
    {
        path:'/client/ClientLost/deferredLoss',
        name:'deferredLoss',
        component:()=>import('../components/pages/client-service/clientLostManage/deferredLoss.vue')
    },

    /*HistoricalOrder */
        //pageContactRecord
    {
        path:'/client/ContactRecord/pageContactRecord',
        name:'pageContactRecord',
        component:()=>import('../components/pages/client-service/contactRecordManage/pageContactRecord.vue')
    },

    {
        path: '/client/ContactRecord/updateContactRecord',
        name: 'updateContactRecord',
        component: () => import('../components/pages/client-service/contactRecordManage/updateContactRecord.vue')
    },
    //pageHistoricalOrder
    {
        path:'/client/HistoricalOrder/pageHistoricalOrder',
        name:'pageHistoricalOrder',
        component:()=>import('../components/pages/client-service/orderHistoryManage/pageHistoricalOrder.vue')
    },

       //detailHistoricalOrder
    {
        path:'/client/HistoricalOrder/detailHistoricalOrder',
        name:'detailHistoricalOrder',
        component:()=>import('../components/pages/client-service/orderHistoryManage/detailHistoricalOrder.vue')
    },
    //detailHistoricalOrder
    // {
    //     path:'/client/HistoricalOrder/pageHistoricalOrder',
    //     name:'pageHistoricalOrder',
    //     component:()=>import('../components/pages/client-service/orderHistoryManage/pageHistoricalOrder.vue')
    // }

]

export default routes;