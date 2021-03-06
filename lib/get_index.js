// Generated by IcedCoffeeScript 1.7.1-a
(function() {
  var GetIndex, a_json_parse, chain, constants, iced, log, make_esc, unix_time, __iced_k, __iced_k_noop, _ref;

  iced = require('iced-coffee-script/lib/coffee-script/iced').runtime;
  __iced_k = __iced_k_noop = function() {};

  make_esc = require('iced-error').make_esc;

  _ref = require('iced-utils').util, chain = _ref.chain, unix_time = _ref.unix_time, a_json_parse = _ref.a_json_parse;

  constants = require('./constants').constants;

  log = require('./log');

  exports.GetIndex = GetIndex = (function() {
    function GetIndex(config) {
      this.config = config;
    }

    GetIndex.prototype.fetch = function(cb) {
      var err, res, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/home/max/src/keybase-node-installer/src/get_index.iced",
            funcname: "GetIndex.fetch"
          });
          _this.config.request("/sig/files/" + (_this.config.key_version()) + "/index.asc", __iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                err = arguments[0];
                res = arguments[1];
                return __slot_1._signed_index = arguments[2];
              };
            })(_this),
            lineno: 15
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return cb(err);
        };
      })(this));
    };

    GetIndex.prototype.verify = function(cb) {
      var a, b, err, now, t, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      now = unix_time();
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/home/max/src/keybase-node-installer/src/get_index.iced",
            funcname: "GetIndex.verify"
          });
          _this.config.oneshot_verify({
            which: 'index',
            sig: _this._signed_index
          }, __iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                err = arguments[0];
                return __slot_1._index = arguments[1];
              };
            })(_this),
            lineno: 22
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          var _ref1, _ref2;
          err = err != null ? err : (t = _this._index.timestamp) == null ? new Error("Bad index; no timestamp") : (a = now - t) > (b = constants.index_timeout) ? new Error("Index timed out: " + a + " > " + b) : ((_ref1 = _this._index.keys) != null ? _ref1.latest : void 0) == null ? new Error("missing required field: keys.latest") : ((_ref2 = _this._index["package"]) != null ? _ref2.latest : void 0) == null ? new Error("missing required field: package.latest") : null;
          return cb(err);
        };
      })(this));
    };

    GetIndex.prototype.run = function(cb) {
      var esc, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      log.debug("+ GetIndex::run");
      esc = make_esc(cb, "GetIndex::run");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/home/max/src/keybase-node-installer/src/get_index.iced",
            funcname: "GetIndex.run"
          });
          _this.fetch(esc(__iced_deferrals.defer({
            lineno: 36
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/home/max/src/keybase-node-installer/src/get_index.iced",
              funcname: "GetIndex.run"
            });
            _this.verify(esc(__iced_deferrals.defer({
              lineno: 37
            })));
            __iced_deferrals._fulfill();
          })(function() {
            _this.config.set_index(_this._index);
            log.debug("- GetIndex::run");
            return cb(null);
          });
        };
      })(this));
    };

    return GetIndex;

  })();

}).call(this);
