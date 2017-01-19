import q from 'q';

let deferred = null; // This module only allows for one autocomplete at a time.

// Hack for fooling Yahoo.
// window.YAHOO = {
//     util: {
//         ScriptNodeDataSource: {
//             callbacks: (data) => {
//                 deferred.resolve(data.ResultSet.Result);
//             }
//         }
//     }
// };

export default (searchStr) => {
    deferred = q.defer();

    // $.ajax({
    //     url: `http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=${ encodeURIComponent(searchStr) }&region=US&lang=en-US`,
    //     cache: true,
    //     dataType: 'jsonp',
    //     jsonpCallback: 'YAHOO.util.ScriptNodeDataSource.callbacks'
    // }).fail(() => {
    //     deferred.reject();
    // });

    $.get(`http://search.xignite.com/Search/Suggest?parameter=XigniteFinancials.GetCompanyBalanceSheet.Identifier&term=${ searchStr }`).done((res) => {
        if (res.Results.length) {
            deferred.resolve(res.Results.map((stock) => {
                return {
                    symbol: stock.Value,
                    name: stock.Text
                };
            }));
        } else {
            deferred.reject();
        }
    }).fail((err) => {
        deferred.reject();
    });

    return deferred.promise;
}