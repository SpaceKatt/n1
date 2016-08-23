
// Set up global application namespace using object literals.
//
// Class names.
//
// Lazily creates:
//
//    N1: {
//      Config: {},
//      Models: {},
//      Collections: {},
//      Routers: {},
//      Views: {},
//      Templates: {},
//      MathLib: {}
//    }
//
var N1 = N1 || {}
N1.Config || (N1.Config = {})
N1.Models || (N1.Models = {})
N1.Collections || (N1.Collections = {})
N1.Routers || (N1.Routers = {})
N1.Views || (N1.Views = {})
N1.Templates || (N1.Templates = {})
N1.MathLib || (N1.MathLib = {})
N1.MathLib.GridTools || (N1.MathLib.GridTools = {})

// Application instance.
var n1 = n1 || {}
