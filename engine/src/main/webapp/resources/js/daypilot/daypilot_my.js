/*
DayPilot Lite
Copyright (c) 2005 - 2014 Annpoint s.r.o.
http://www.daypilot.org/
Licensed under Apache Software License 2.0
Version: 126
*/
if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    var $a = function() {};
    if (typeof DayPilot.Calendar !== 'undefined') {
        return;
    };

    function loadDefaultCss() {
        if (DayPilot.Global.defaultCalendarCss) {
            return;
        };
        var $b = DayPilot.sheet();
        $b.add(".calendar_default_main", "border: 1px solid #999;font-family: Tahoma, Arial, sans-serif; font-size: 12px;");
        $b.add(".calendar_default_rowheader_inner,.calendar_default_cornerright_inner,.calendar_default_corner_inner,.calendar_default_colheader_inner,.calendar_default_alldayheader_inner", "color: #666;background: #eee;");
        $b.add(".calendar_default_cornerright_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;	border-bottom: 1px solid #999;");
        $b.add(".calendar_default_rowheader_inner", "font-size: 16pt;text-align: right; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $b.add(".calendar_default_corner_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $b.add(".calendar_default_rowheader_minutes", "font-size:10px;vertical-align: super;padding-left: 2px;padding-right: 2px;");
        $b.add(".calendar_default_colheader_inner", "text-align: center; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $b.add(".calendar_default_cell_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #ddd;border-bottom: 1px solid #ddd; background: #f9f9f9;");
        $b.add(".calendar_default_cell_business .calendar_default_cell_inner", "background: #fff");
        $b.add(".calendar_default_alldayheader_inner", "text-align: center;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $b.add(".calendar_default_message", "opacity: 0.9;filter: alpha(opacity=90);	padding: 10px; color: #ffffff;background: #ffa216;");
        $b.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", 'color: #666; border: 1px solid #999;');
        $b.add(".calendar_default_event_bar", "top: 0px;bottom: 0px;left: 0px;width: 4px;background-color: #9dc8e8;");
        $b.add(".calendar_default_event_bar_inner", "position: absolute;width: 4px;background-color: #1066a8;");
        $b.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");');
        $b.add(".calendar_default_selected .calendar_default_event_inner", "background: #ddd;");
        $b.add(".calendar_default_alldayevent_inner", "position: absolute;top: 2px;bottom: 2px;left: 2px;right: 2px;padding: 2px;margin-right: 1px;font-size: 12px;");
        $b.add(".calendar_default_event_withheader .calendar_default_event_inner", "padding-top: 15px;");
        $b.add(".calendar_default_event", "cursor: default;");
        $b.add(".calendar_default_event_inner", "position: absolute;overflow: hidden;top: 0px;bottom: 0px;left: 0px;right: 0px;padding: 2px 2px 2px 6px;font-size: 12px;");
        $b.add(".calendar_default_shadow_inner", "background-color: #666666;	opacity: 0.5;filter: alpha(opacity=50);height: 100%;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;");
        $b.commit();
        DayPilot.Global.defaultCalendarCss = true;
    };
    var DayPilotCalendar = {};
    DayPilotCalendar.selectedCells = [];
    DayPilotCalendar.topSelectedCell = null;
    DayPilotCalendar.bottomSelectedCell = null;
    DayPilotCalendar.selecting = false;
    DayPilotCalendar.column = null;
    DayPilotCalendar.firstSelected = null;
    DayPilotCalendar.firstMousePos = null;
    DayPilotCalendar.originalMouse = null;
    DayPilotCalendar.originalHeight = null;
    DayPilotCalendar.originalTop = null;
    DayPilotCalendar.resizing = null;
    DayPilotCalendar.globalHandlers = false;
    DayPilotCalendar.moving = null;
    DayPilotCalendar.register = function($c) {
        if (!DayPilotCalendar.registered) {
            DayPilotCalendar.registered = [];
        };
        var r = DayPilotCalendar.registered;
        for (var i = 0; i < r.length; i++) {
            if (r[i] === $c) {
                return;
            }
        };
        r.push($c);
    };
    DayPilotCalendar.unregister = function($c) {
        var a = DayPilotCalendar.registered;
        if (!a) {
            return;
        };
        var i = DayPilot.indexOf(a, $c);
        if (i === -1) {
            return;
        };
        a.splice(i, 1);
    };
    DayPilotCalendar.getCellsAbove = function($d) {
        var $e = [];
        var c = DayPilotCalendar.getColumn($d);
        var tr = $d.parentNode;
        var $f = null;
        while (tr && $f !== DayPilotCalendar.firstSelected) {
            $f = tr.getElementsByTagName("td")[c];
            $e.push($f);
            tr = tr.previousSibling;
            while (tr && tr.tagName !== "TR") {
                tr = tr.previousSibling;
            }
        };
        return $e;
    };
    DayPilotCalendar.getCellsBelow = function($d) {
        var $e = [];
        var c = DayPilotCalendar.getColumn($d);
        var tr = $d.parentNode;
        var $f = null;
        while (tr && $f !== DayPilotCalendar.firstSelected) {
            $f = tr.getElementsByTagName("td")[c];
            $e.push($f);
            tr = tr.nextSibling;
            while (tr && tr.tagName !== "TR") {
                tr = tr.nextSibling;
            }
        };
        return $e;
    };
    DayPilotCalendar.getColumn = function($d) {
        var i = 0;
        while ($d.previousSibling) {
            $d = $d.previousSibling;
            if ($d.tagName === "TD") {
                i++;
            }
        };
        return i;
    };
    DayPilotCalendar.gUnload = function(ev) {
        if (!DayPilotCalendar.registered) {
            return;
        };
        var r = DayPilotCalendar.registered;
        for (var i = 0; i < r.length; i++) {
            var c = r[i];
            c.dispose();
            DayPilotCalendar.unregister(c);
        }
    };
    DayPilotCalendar.gMouseUp = function(e) {
        if (DayPilotCalendar.resizing) {
            if (!DayPilotCalendar.resizingShadow) {
                DayPilotCalendar.resizing.style.cursor = 'default';
                document.body.style.cursor = 'default';
                DayPilotCalendar.resizing = null;
                return;
            };
            var $g = DayPilotCalendar.resizing.event;
            var $h = DayPilotCalendar.resizingShadow.clientHeight + 4;
            var top = DayPilotCalendar.resizingShadow.offsetTop;
            var $i = DayPilotCalendar.resizing.dpBorder;
            DayPilotCalendar.deleteShadow(DayPilotCalendar.resizingShadow);
            DayPilotCalendar.resizingShadow = null;
            DayPilotCalendar.resizing.style.cursor = 'default';
            document.body.style.cursor = 'default';
            DayPilotCalendar.resizing = null;
            $g.calendar.eventResizeDispatch($g, $h, top, $i);
        } else if (DayPilotCalendar.moving) {
            if (!DayPilotCalendar.movingShadow) {
                DayPilotCalendar.moving = null;
                document.body.style.cursor = 'default';
                return;
            };
            var top = DayPilotCalendar.movingShadow.offsetTop;
            DayPilotCalendar.deleteShadow(DayPilotCalendar.movingShadow);
            var $g = DayPilotCalendar.moving.event;
            var $j = DayPilotCalendar.movingShadow.column;
            DayPilotCalendar.moving = null;
            DayPilotCalendar.movingShadow = null;
            document.body.style.cursor = 'default';
            var ev = e || window.event;
            $g.calendar.eventMoveDispatch($g, $j, top, ev);
        }
    };
    DayPilotCalendar.deleteShadow = function($k) {
        if (!$k) {
            return;
        };
        if (!$k.parentNode) {
            return;
        };
        $k.parentNode.removeChild($k);
    };
    DayPilotCalendar.moveShadow = function($l) {
        var $k = DayPilotCalendar.movingShadow;
        var parent = $k.parentNode;
        parent.style.display = 'none';
        $k.parentNode.removeChild($k);
        $l.firstChild.appendChild($k);
        $k.style.left = '0px';
        parent.style.display = '';
        $k.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
    };
    DayPilotCalendar.Calendar = function(id) {
        var $m = false;
        if (this instanceof DayPilotCalendar.Calendar && !this.$1y) {
            $m = true;
            this.$1y = true;
        };
        if (!$m) {
            throw "DayPilot.Calendar() is a constructor and must be called as 'var c = new DayPilot.Calendar(id);'";
        };
        var $c = this;
        this.uniqueID = null;
        this.v = '126';
        this.id = id;
        this.clientName = id;
        this.cache = {};
        this.cache.pixels = {};
        this.elements = {};
        this.elements.events = [];
        this.nav = {};
        this.afterRender = function() {};
        this.fasterDispose = true;
        this.api = 2;
        this.borderColor = "#CED2CE";
        this.businessBeginsHour = 9;
        this.businessEndsHour = 18;
        this.cellBackColor = "#ffffff";
        this.cellBorderColor = "#DEDFDE";
        this.cellHeight = 20;
        this.columnMarginRight = 5;
        this.cornerBackColor = "#F3F3F9";
        this.cssOnly = true;
        this.cssClassPrefix = "calendar_default";
        this.days = 1;
        this.eventBackColor = '#638EDE';
        this.eventBorderColor = "#2951A5";
        this.eventFontFamily = 'Tahoma, Arial, Helvetica, sans-serif';
        this.eventFontSize = '8pt';
        this.eventFontColor = "#ffffff";
        this.eventHeaderFontSize = '8pt';
        this.eventHeaderFontFamily = 'Tahoma, Arial, Helvetica, sans-serif';
        this.eventHeaderFontColor = "#ffffff";
        this.eventHeaderHeight = 14;
        this.eventHeaderVisible = true;
        this.headerFontSize = '10pt';
        this.headerFontFamily = 'Tahoma, Arial, Helvetica, sans-serif';
        this.headerFontColor = "#42658C";
        this.headerHeight = 20;
        this.height = 300;
        this.heightSpec = 'BusinessHours';
        this.hideUntilInit = true;
        this.hourHalfBorderColor = "#EBEDEB";
        this.hourBorderColor = "#DEDFDE";
        this.hourFontColor = "#42658C";
        this.hourFontFamily = "Tahoma, Arial, Helvetica, sans-serif";
        this.hourFontSize = "16pt";
        this.hourNameBackColor = "#F3F3F9";
        this.hourNameBorderColor = "#DEDFDE";
        this.hourWidth = 45;
        this.initScrollPos = 'Auto';
        this.loadingLabelText = "Loading...";
        this.loadingLabelVisible = true;
        this.loadingLabelBackColor = "ff0000";
        this.loadingLabelFontColor = "#ffffff";
        this.loadingLabelFontFamily = "Tahoma, Arial, Helvetica, sans-serif";
        this.loadingLabelFontSize = "10pt";
        this.selectedColor = "#316AC5";
        this.showToolTip = true;
        this.startDate = new DayPilot.Date().getDatePart();
        this.timeFormat = 'Clock12Hours';
        this.timeRangeSelectedHandling = 'Enabled';
        this.eventClickHandling = 'Enabled';
        this.eventResizeHandling = 'Update';
        this.eventMoveHandling = 'Update';
        this.clearSelection = function() {
            for (var j = 0; j < DayPilotCalendar.selectedCells.length; j++) {
                var $d = DayPilotCalendar.selectedCells[j];
                if ($d) {
                    if ($d.selected) {
                        $d.removeChild($d.selected);
                        $d.firstChild.style.display = '';
                        $d.selected = null;
                    }
                }
            }
        };
        this.ie = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
        this.ff = (navigator && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1);
        this.opera105 = (function() {
            if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var v = new Number(RegExp.$1);
                return v >= 10.5;
            };
            return false;
        })();
        this.webkit522 = (function() {
            if (/AppleWebKit[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var v = new Number(RegExp.$1);
                return v >= 522;
            };
            return false;
        })();
        this.ie9 = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE 9") !== -1);
        this.cleanSelection = this.clearSelection;
        this.callBack2 = function($n, $o, $p) {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            this.callbackTimeout = window.setTimeout(function() {
                $c.loadingStart();
            }, 100);
            var $q = {};
            $q.action = $n;
            $q.parameters = $p;
            $q.data = $o;
            $q.header = this.getCallBackHeader();
            var $r = "JSON" + DayPilot.JSON.stringify($q);
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.callBackResponse, $r, this.ajaxError);
            }
        };
        this.dispose = function() {
            var c = $c;
            c.deleteEvents();
            c.nav.zoom.onmousemove = null;
            c.nav.scroll.root = null;
            DayPilot.pu(c.nav.loading);
            c.disposeMain();
            c.disposeHeader();
            c.nav.select = null;
            c.nav.cornerRight = null;
            c.nav.scrollable = null;
            c.nav.zoom = null;
            c.nav.loading = null;
            c.nav.header = null;
            c.nav.hourTable = null;
            c.nav.scrolltop = null;
            c.nav.scroll = null;
            c.nav.main = null;
            c.nav.message = null;
            c.nav.messageClose = null;
            c.nav.top = null;
            DayPilotCalendar.unregister(c);
        };
        this.registerDispose = function() {
            var $s = document.getElementById(id);
            $s.dispose = this.dispose;
        };
        this.callBackResponse = function($t) {
            $c.updateView($t.responseText);
        };
        this.getCallBackHeader = function() {
            var h = {};
            h.control = "dpc";
            h.id = this.id;
            h.v = this.v;
            h.days = $c.days;
            h.startDate = $c.startDate;
            h.heightSpec = $c.heightSpec;
            h.businessBeginsHour = $c.businessBeginsHour;
            h.businessEndsHour = $c.businessEndsHour;
            h.backColor = $c.cellBackColor;
            h.timeFormat = $c.timeFormat;
            h.viewType = $c.viewType;
            h.locale = $c.locale;
            return h;
        };
        this.createShadow = function($u, $v) {
            var $w = $u.parentNode;
            while ($w && $w.tagName !== "TD") {
                $w = $w.parentNode;
            };
            var $k = document.createElement('div');
            $k.setAttribute('unselectable', 'on');
            $k.style.position = 'absolute';
            $k.style.width = ($u.offsetWidth - 4) + 'px';
            $k.style.height = ($u.offsetHeight - 4) + 'px';
            $k.style.left = ($u.offsetLeft) + 'px';
            $k.style.top = ($u.offsetTop) + 'px';
            $k.style.border = '2px dotted #666666';
            $k.style.zIndex = 101;
            $k.style.backgroundColor = "#aaaaaa";
            $k.style.opacity = 0.5;
            $k.style.filter = "alpha(opacity=50)";
            $k.style.border = '2px solid #aaaaaa';
            if ($v) {
                $k.style.overflow = 'hidden';
                $k.style.fontSize = $u.style.fontSize;
                $k.style.fontFamily = $u.style.fontFamily;
                $k.style.color = $u.style.color;
                $k.innerHTML = $u.data.client.html();
            };
            $k.style.MozBorderRadius = "5px";
            $k.style.webkitBorderRadius = "5px";
            $k.style.borderRadius = "5px";
            $w.firstChild.appendChild($k);
            return $k;
        };
        this.$1z = {};
        this.$1z.locale = function() {
            var $x = DayPilot.Locale.find($c.locale);
            if (!$x) {
                return DayPilot.Locale.US;
            };
            return $x;
        };
        var $y = this.$1z;
        this.updateView = function($z, $A) {
            var $z = eval("(" + $z + ")");
            if ($z.CallBackRedirect) {
                document.location.href = $z.CallBackRedirect;
                return;
            };
            if ($z.UpdateType === "None") {
                $c.loadingStop();
                $c.show();
                return;
            };
            $c.deleteEvents();
            if ($z.UpdateType === "Full") {
                $c.columns = $z.Columns;
                $c.days = $z.Days;
                $c.startDate = new DayPilot.Date($z.StartDate);
                $c.heightSpec = $z.HeightSpec ? $z.HeightSpec : $c.heightSpec;
                $c.businessBeginsHour = $z.BusinessBeginsHour ? $z.BusinessBeginsHour : $c.businessBeginsHour;
                $c.businessEndsHour = $z.BusinessEndsHour ? $z.BusinessEndsHour : $c.businessEndsHour;
                $c.viewType = $z.ViewType;
                $c.backColor = $z.BackColor ? $z.BackColor : $c.backColor;
                $c.eventHeaderVisible = $z.EventHeaderVisible ? $z.EventHeaderVisible : $c.eventHeaderVisible;
                $c.timeFormat = $z.TimeFormat ? $z.TimeFormat : $c.timeFormat;
                $c.locale = $z.Locale ? $z.Locale : $c.locale;
                $c.prepareColumns();
            };
            $c.loadEvents($z.Events);
            $c.updateHeaderHeight();
            if ($z.UpdateType === "Full") {
                $c.drawHeader();
                $c.drawMain();
                $c.drawHourTable();
                $c.updateHeight();
            };
            $c.show();
            $c.drawEvents();
            $c.clearSelection();
            $c.afterRender($z.CallBackData, true);
            $c.loadingStop();
        };
        this.$ = function($B) {
            return document.getElementById(id + "_" + $B);
        };
        this.durationHours = function() {
            return 24;
        };
        this.businessHoursSpan = function() {
            if (this.businessBeginsHour > this.businessEndsHour) {
                return 24 - this.businessBeginsHour + this.businessEndsHour;
            } else {
                return this.businessEndsHour - this.businessBeginsHour;
            }
        };
        this.rowCount = function() {
            return 48;
        };
        this.$1A = function() {
            return $c.api === 2;
        };
        this.eventClickCallBack = function(e, $o) {
            this.callBack2('EventClick', $o, e);
        };
        this.eventClickDispatch = function(e) {
            var $C = this;
            var e = $C.event;
            if ($c.$1A()) {
                var $D = {};
                $D.e = e;
                $D.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventClick === 'function') {
                    $c.onEventClick($D);
                    if ($D.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventClickHandling) {
                    case 'CallBack':
                        $c.eventClickCallBack(e);
                        break;
                };
                if (typeof $c.onEventClicked === 'function') {
                    $c.onEventClicked($D);
                }
            } else {
                switch ($c.eventClickHandling) {
                    case 'CallBack':
                        $c.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $c.onEventClick(e);
                        break;
                }
            }
        };
        this.eventResizeCallBack = function(e, $E, $F, $o) {
            if (!$E) throw 'newStart is null';
            if (!$F) throw 'newEnd is null';
            var $G = {};
            $G.e = e;
            $G.newStart = $E;
            $G.newEnd = $F;
            this.callBack2('EventResize', $o, $G);
        };
        this.eventResizeDispatch = function(e, $H, $I, $i) {
            var $J = 1;
            var $E = new Date();
            var $F = new Date();
            var $K = e.start();
            var end = e.end();
            if ($i === 'top') {
                var $L = $K.getDatePart();
                var $M = Math.floor(($I - $J) / $c.cellHeight);
                var $N = $M * 30;
                var ts = $N * 60 * 1000;
                $E = $L.addTime(ts);
                $F = e.end();
            } else if ($i === 'bottom') {
                var $L = end.getDatePart();
                var $M = Math.floor(($I + $H - $J) / $c.cellHeight);
                var $N = $M * 30;
                var ts = $N * 60 * 1000;
                $E = $K;
                $F = $L.addTime(ts);
            };
            if ($c.$1A()) {
                var $D = {};
                $D.e = e;
                $D.newStart = $E;
                $D.newEnd = $F;
                $D.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventResize === 'function') {
                    $c.onEventResize($D);
                    if ($D.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventResizeHandling) {
                    case 'CallBack':
                        $c.eventResizeCallBack(e, $E, $F);
                        break;
                    case 'Update':
                        e.start($E);
                        e.end($F);
                        $c.events.update(e);
                        break;
                };
                if (typeof $c.onEventResized === 'function') {
                    $c.onEventResized($D);
                }
            } else {
                switch ($c.eventResizeHandling) {
                    case 'CallBack':
                        $c.eventResizeCallBack(e, $E, $F);
                        break;
                    case 'JavaScript':
                        $c.onEventResize(e, $E, $F);
                        break;
                }
            }
        };
        this.eventMoveCallBack = function(e, $E, $F, $O, $o) {
            if (!$E) throw 'newStart is null';
            if (!$F) throw 'newEnd is null';
            var $G = {};
            $G.e = e;
            $G.newStart = $E;
            $G.newEnd = $F;
            this.callBack2('EventMove', $o, $G);
        };
        this.eventMoveDispatch = function(e, $j, $I, ev) {
            var $J = 1;
            var $M = Math.floor(($I - $J) / $c.cellHeight);
            var $P = $M * 30 * 60 * 1000;
            var $K = e.start();
            var end = e.end();
            var $L = new Date();
            if ($K.isDayPilotDate) {
                $K = $K.d;
            };
            $L.setTime(Date.UTC($K.getUTCFullYear(), $K.getUTCMonth(), $K.getUTCDate()));
            var $Q = $K.getTime() - ($L.getTime() + $K.getUTCHours() * 3600 * 1000 + Math.floor($K.getUTCMinutes() / 30) * 30 * 60 * 1000);
            var length = end.getTime() - $K.getTime();
            var $R = this.columns[$j];
            var $S = $R.Start.getTime();
            var $T = new Date();
            $T.setTime($S + $P + $Q);
            var $E = new DayPilot.Date($T);
            var $F = $E.addTime(length);
            if ($c.$1A()) {
                var $D = {};
                $D.e = e;
                $D.newStart = $E;
                $D.newEnd = $F;
                $D.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventMove === 'function') {
                    $c.onEventMove($D);
                    if ($D.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventMoveHandling) {
                    case 'CallBack':
                        $c.eventMoveCallBack(e, $E, $F, $R.Value);
                        break;
                    case 'Update':
                        e.start($E);
                        e.end($F);
                        $c.events.update(e);
                        break;
                };
                if (typeof $c.onEventMoved === 'function') {
                    $c.onEventMoved($D);
                }
            } else {
                switch ($c.eventMoveHandling) {
                    case 'CallBack':
                        $c.eventMoveCallBack(e, $E, $F, $R.Value);
                        break;
                    case 'JavaScript':
                        $c.onEventMove(e, $E, $F, $R.Value, false);
                        break;
                }
            }
        };
        this.timeRangeSelectedCallBack = function($K, end, $U, $o) {
            var $V = {};
            $V.start = $K;
            $V.end = end;
            this.callBack2('TimeRangeSelected', $o, $V);
        };
        this.timeRangeSelectedDispatch = function($K, end) {
            $K = new DayPilot.Date($K);
            end = new DayPilot.Date(end);
            if (this.$1A()) {
                var $D = {};
                $D.start = $K;
                $D.end = end;
                $D.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeSelect === 'function') {
                    $c.onTimeRangeSelect($D);
                    if ($D.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.timeRangeSelectedHandling) {
                    case 'CallBack':
                        $c.timeRangeSelectedCallBack($K, end);
                        break;
                };
                if (typeof $c.onTimeRangeSelected === 'function') {
                    $c.onTimeRangeSelected($D);
                }
            } else {
                switch ($c.timeRangeSelectedHandling) {
                    case 'CallBack':
                        $c.timeRangeSelectedCallBack($K, end);
                        break;
                    case 'JavaScript':
                        $c.onTimeRangeSelected($K, end);
                        break;
                }
            }
        };
        this.onCellMousedown = function(ev) {
            if (DayPilotCalendar.selecting) {
                return;
            };
            if ($c.timeRangeSelectedHandling === "Disabled") {
                return;
            };
            var $W = (window.event) ? window.event.button : ev.which;
            if ($W !== 1 && $W !== 0) {
                return;
            };
            DayPilotCalendar.firstMousePos = DayPilot.mc(ev || window.event);
            DayPilotCalendar.selecting = true;
            if (DayPilotCalendar.selectedCells) {
                $c.clearSelection();
                DayPilotCalendar.selectedCells = [];
            };
            DayPilotCalendar.column = DayPilotCalendar.getColumn(this);
            DayPilotCalendar.selectedCells.push(this);
            DayPilotCalendar.firstSelected = this;
            DayPilotCalendar.topSelectedCell = this;
            DayPilotCalendar.bottomSelectedCell = this;
            $c.activateSelection();
        };
        this.activateSelection = function() {
            var $X = this.getSelection();
            for (var j = 0; j < DayPilotCalendar.selectedCells.length; j++) {
                var $d = DayPilotCalendar.selectedCells[j];
                if ($d && !$d.selected) {
                    var $Y = document.createElement("div");
                    $Y.style.height = ($c.cellHeight - 1) + "px";
                    $Y.style.backgroundColor = $c.selectedColor;
                    $d.firstChild.style.display = "none";
                    $d.insertBefore($Y, $d.firstChild);
                    $d.selected = $Y;
                }
            }
        };
        this.mousemove = function(ev) {
            if (typeof(DayPilotCalendar) === 'undefined') {
                return;
            };
            if (!DayPilotCalendar.selecting) {
                return;
            };
            var $Z = DayPilot.mc(ev || window.event);
            var $00 = DayPilotCalendar.getColumn(this);
            if ($00 !== DayPilotCalendar.column) {
                return;
            };
            $c.clearSelection();
            if ($Z.y < DayPilotCalendar.firstMousePos.y) {
                DayPilotCalendar.selectedCells = DayPilotCalendar.getCellsBelow(this);
                DayPilotCalendar.topSelectedCell = DayPilotCalendar.selectedCells[0];
                DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.firstSelected;
            } else {
                DayPilotCalendar.selectedCells = DayPilotCalendar.getCellsAbove(this);
                DayPilotCalendar.topSelectedCell = DayPilotCalendar.firstSelected;
                DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.selectedCells[0];
            };
            $c.activateSelection();
        };
        this.getSelection = function() {
            var $K = DayPilotCalendar.topSelectedCell.start;
            var end = DayPilotCalendar.bottomSelectedCell.end;
            return new DayPilot.Selection($K, end, null, $c);
        };
        this.mouseup = function(ev) {
            if (DayPilotCalendar.selecting && DayPilotCalendar.topSelectedCell !== null) {
                DayPilotCalendar.selecting = false;
                var $01 = $c.getSelection();
                $c.timeRangeSelectedDispatch($01.start, $01.end);
                if ($c.timeRangeSelectedHandling !== "Hold" && $c.timeRangeSelectedHandling !== "HoldForever") {
                    $a();
                }
            } else {
                DayPilotCalendar.selecting = false;
            }
        };
        this.prepareColumns = function() {
            this.columns = this.$1B();
            for (var i = 0; i < this.columns.length; i++) {
                this.activateColumn(this.columns[i]);
            }
        };
        this.activateColumn = function($l) {
            $l.Start = new DayPilot.Date($l.Start);
            $l.putIntoBlock = function(ep) {
                for (var i = 0; i < this.blocks.length; i++) {
                    var $02 = this.blocks[i];
                    if ($02.overlapsWith(ep.part.top, ep.part.height)) {
                        $02.events.push(ep);
                        $02.min = Math.min($02.min, ep.part.top);
                        $02.max = Math.max($02.max, ep.part.top + ep.part.height);
                        return i;
                    }
                };
                var $02 = [];
                $02.lines = [];
                $02.events = [];
                $02.overlapsWith = function($K, $03) {
                    var end = $K + $03 - 1;
                    if (!(end < this.min || $K > this.max - 1)) {
                        return true;
                    };
                    return false;
                };
                $02.putIntoLine = function(ep) {
                    var $04 = this;
                    for (var i = 0; i < this.lines.length; i++) {
                        var $05 = this.lines[i];
                        if ($05.isFree(ep.part.top, ep.part.height)) {
                            $05.push(ep);
                            return i;
                        }
                    };
                    var $05 = [];
                    $05.isFree = function($K, $03) {
                        var end = $K + $03 - 1;
                        var $06 = this.length;
                        for (var i = 0; i < $06; i++) {
                            var e = this[i];
                            if (!(end < e.part.top || $K > e.part.top + e.part.height - 1)) {
                                return false;
                            }
                        };
                        return true;
                    };
                    $05.push(ep);
                    this.lines.push($05);
                    return this.lines.length - 1;
                };
                $02.events.push(ep);
                $02.min = ep.part.top;
                $02.max = ep.part.top + ep.part.height;
                this.blocks.push($02);
                return this.blocks.length - 1;
            };
            $l.putIntoLine = function(ep) {
                var $04 = this;
                for (var i = 0; i < this.lines.length; i++) {
                    var $05 = this.lines[i];
                    if ($05.isFree(ep.part.top, ep.part.height)) {
                        $05.push(ep);
                        return i;
                    }
                };
                var $05 = [];
                $05.isFree = function($K, $03) {
                    var end = $K + $03 - 1;
                    var $06 = this.length;
                    for (var i = 0; i < $06; i++) {
                        var e = this[i];
                        if (!(end < e.part.top || $K > e.part.top + e.part.height - 1)) {
                            return false;
                        }
                    };
                    return true;
                };
                $05.push(ep);
                this.lines.push($05);
                return this.lines.length - 1;
            };
        };
        this.$1B = function() {
            var $07 = [];
            var $K = this.startDate.getDatePart();
            var $08 = this.days;
            switch (this.viewType) {
                case "Day":
                    $08 = 1;
                    break;
                case "Week":
                    $08 = 7;
                    $K = $K.firstDayOfWeek($y.locale().weekStarts);
                    break;
                case "WorkWeek":
                    $08 = 5;
                    $K = $K.firstDayOfWeek(1);
                    break;
            };
            if (this.heightSpec === 'BusinessHoursNoScroll') {
                $K = $K.addHours(this.businessBeginsHour);
            };
            for (var i = 0; i < $08; i++) {
                var $l = {};
                $l.Start = $K.addDays(i);
                $l.Name = $l.Start.toString($y.locale().datePattern);
                $l.InnerHTML = $l.Name;
                $07.push($l);
            };
            return $07;
        };
        this.visibleStart = function() {
            return this.columns[0].Start;
        };
        this.visibleEnd = function() {
            var $06 = this.columns.length - 1;
            return this.columns[$06].Start.addDays(1);
        };
        this.$1C = function($09) {
            var $0a = this.theme || this.cssClassPrefix;
            if ($0a) {
                return $0a + $09;
            } else {
                return "";
            }
        };
        this.deleteEvents = function() {
            if (this.elements.events) {
                for (var i = 0; i < this.elements.events.length; i++) {
                    var $Y = this.elements.events[i];
                    var $u = $Y.event;
                    if ($u) {
                        $u.calendar = null;
                    };
                    $Y.onclick = null;
                    $Y.onclickSave = null;
                    $Y.onmouseover = null;
                    $Y.onmouseout = null;
                    $Y.onmousemove = null;
                    $Y.onmousedown = null;
                    if ($Y.firstChild && $Y.firstChild.firstChild && $Y.firstChild.firstChild.tagName && $Y.firstChild.firstChild.tagName.toUpperCase() === 'IMG') {
                        var $0b = $Y.firstChild.firstChild;
                        $0b.onmousedown = null;
                        $0b.onmousemove = null;
                        $0b.onclick = null;
                    };
                    $Y.helper = null;
                    $Y.data = null;
                    $Y.event = null;
                    DayPilot.de($Y);
                }
            };
            this.elements.events = [];
        };
        this.drawEvent = function($o) {
            var $0c = this.nav.events;
            var $0d = true;
            var $0e = true;
            var $0f = false;
            var $0g = this.eventBorderColor;
            var $Y = document.createElement("div");
            $Y.style.position = 'absolute';
            $Y.style.left = $o.part.left + '%';
            $Y.style.top = ($o.part.top) + 'px';
            $Y.style.width = $o.part.width + '%';
            $Y.style.height = Math.max($o.part.height, 2) + 'px';
            $Y.style.overflow = 'hidden';
            $Y.data = $o;
            $Y.event = $o;
            $Y.unselectable = 'on';
            $Y.style.MozUserSelect = 'none';
            $Y.style.KhtmlUserSelect = 'none';
            if (!this.cssOnly) {
                $Y.style.fontFamily = this.eventFontFamily;
                $Y.style.fontSize = this.eventFontSize;
                $Y.style.color = this.eventFontColor;
                if (!$0d) {
                    $Y.style.backgroundColor = $0g;
                }
            } else {
                $Y.className = this.$1C("_event");
            };
            $Y.isFirst = $o.part.start.getTime() === $o.start().getTime();
            $Y.isLast = $o.part.end.getTime() === $o.end().getTime();
            $Y.onclick = this.eventClickDispatch;
            $Y.onmousemove = function(ev) {
                var $0h = 5;
                var $0i = $c.eventHeaderVisible ? ($c.eventHeaderHeight) : 10;
                if (typeof(DayPilotCalendar) === 'undefined') {
                    return;
                };
                var $0j = DayPilot.mo3($Y, ev);
                if (!$0j) {
                    return;
                };
                if (DayPilotCalendar.resizing || DayPilotCalendar.moving) {
                    return;
                };
                var $0k = this.isLast;
                if ($0j.y <= $0i && $c.eventResizeHandling !== 'Disabled') {
                    this.style.cursor = "n-resize";
                    this.dpBorder = 'top';
                } else if (this.offsetHeight - $0j.y <= $0h && $c.eventResizeHandling !== 'Disabled') {
                    if ($0k) {
                        this.style.cursor = "s-resize";
                        this.dpBorder = 'bottom';
                    } else {
                        this.style.cursor = 'not-allowed';
                    }
                } else if (!DayPilotCalendar.resizing && !DayPilotCalendar.moving) {
                    if ($c.eventClickHandling !== 'Disabled') {
                        this.style.cursor = 'pointer';
                    } else {
                        this.style.cursor = 'default';
                    }
                }
            };
            $Y.onmousedown = function(ev) {
                ev = ev || window.event;
                var $W = ev.which || ev.button;
                if ((this.style.cursor === 'n-resize' || this.style.cursor === 's-resize') && $W === 1) {
                    DayPilotCalendar.resizing = this;
                    DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                    DayPilotCalendar.originalHeight = this.offsetHeight;
                    DayPilotCalendar.originalTop = this.offsetTop;
                } else if ($W === 1 && this.eventMoveHandling !== 'Disabled') {
                    DayPilotCalendar.moving = this;
                    DayPilotCalendar.moving.event = this.event;
                    var $0l = DayPilotCalendar.moving.helper = {};
                    $0l.oldColumn = $c.columns[this.data.part.dayIndex].Value;
                    DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                    DayPilotCalendar.originalTop = this.offsetTop;
                    var $0j = DayPilot.mo3(this, ev);
                    if ($0j) {
                        DayPilotCalendar.moveOffsetY = $0j.y;
                    } else {
                        DayPilotCalendar.moveOffsetY = 0;
                    };
                    document.body.style.cursor = 'move';
                };
                return false;
            };
            if (!this.cssOnly) {
                var $0m = [];
                $0m.push("<div");
                if (this.showToolTip) {
                    $0m.push(" title='");
                    $0m.push($o.client.toolTip().replace(/'/g, "&apos;"));
                    $0m.push("'");
                };
                var $h = Math.max($o.part.height - 2, 0);
                $0m.push(" class='");
                $0m.push("'");
                if ($0f) {
                    $0m.push(" style='margin-top:1px;height:");
                    $0m.push($h - 2);
                } else {
                    $0m.push(" style='margin-top:0px;height:");
                    $0m.push($h);
                };
                $0m.push("px;background-color:");
                $0m.push(this.eventBackColor);
                if ($0e) {
                    $0m.push(";border:1px solid ");
                    $0m.push($0g);
                    $0m.push(";-moz-border-radius:5px;");
                    $0m.push(";-webkit-border-radius:5px;");
                    $0m.push(";border-radius:5px;");
                } else {
                    $0m.push(";border-left:1px solid ");
                    $0m.push($0g);
                    $0m.push(";border-right:1px solid ");
                    $0m.push($0g);
                };
                $0m.push(";");
                $0m.push("' unselectable='on'>");
                var $0n = this.eventHeaderVisible ? this.eventHeaderHeight : 0;
                if (this.eventHeaderVisible) {
                    var $0o = "";
                    var $0p = $o.start().getHours();
                    var am = $0p < 12;
                    var $0q = $o.start().getMinutes();
                    if (this.timeFormat === "Clock12Hours") {
                        $0p = $0p % 12;
                        if ($0p === 0) {
                            $0p = 12;
                        };
                        $0o = am ? "am1" : "pm1";
                    };
                    if ($0q < 10) {
                        $0q = "0" + $0q;
                    };
                    var $0r = $0p + ":" + $0q + $0o;
                    $0m.push("<div unselectable='on' style='overflow:hidden;height:");
                    $0m.push(this.eventHeaderHeight);
                    $0m.push("px; background-color:");
                    $0m.push($0g);
                    $0m.push(";font-size:");
                    $0m.push(this.eventHeaderFontSize);
                    $0m.push(";color:");
                    $0m.push(this.eventHeaderFontColor);
                    $0m.push("'>");
                    $0m.push($0r);
                    $0m.push("</div>");
                };
                $0m.push("<div unselectable='on' style='overflow:hidden;padding-left:2px;height:");
                $0m.push($h - $0n - 1);
                $0m.push("px;'>");
                $0m.push($o.client.html());
                $0m.push("</div></div>");
                $Y.innerHTML = $0m.join('');
            } else {
                var $0s = document.createElement("div");
                $0s.setAttribute("unselectable", "on");
                $0s.className = $c.$1C("_event_inner");
                $0s.innerHTML = $o.client.html();
                $Y.appendChild($0s);
            };
            if ($0c.rows[0].cells[$o.part.dayIndex]) {
                var $0t = $0c.rows[0].cells[$o.part.dayIndex].firstChild;
                $0t.appendChild($Y);
                $c.makeChildrenUnselectable($Y);
            };
            $c.elements.events.push($Y);
        };
        this.makeChildrenUnselectable = function(el) {
            var c = (el && el.childNodes) ? el.childNodes.length : 0;
            for (var i = 0; i < c; i++) {
                try {
                    var $0u = el.childNodes[i];
                    if ($0u.nodeType === 1) {
                        $0u.unselectable = 'on';
                        this.makeChildrenUnselectable($0u);
                    }
                } catch (e) {}
            }
        };
        this.drawEvents = function() {
            for (var i = 0; i < this.columns.length; i++) {
                var $0v = this.columns[i];
                for (var m = 0; m < $0v.blocks.length; m++) {
                    var $02 = $0v.blocks[m];
                    for (var j = 0; j < $02.lines.length; j++) {
                        var $05 = $02.lines[j];
                        for (var k = 0; k < $05.length; k++) {
                            var e = $05[k];
                            e.part.width = 100 / $02.lines.length;
                            e.part.left = e.part.width * j;
                            var $0w = (j === $02.lines.length - 1);
                            if (!$0w) {
                                e.part.width = e.part.width * 1.5;
                            };
                            this.drawEvent(e);
                        }
                    }
                }
            }
        };
        this.drawTop = function() {
            this.nav.top = document.getElementById(this.id);
            this.nav.top.innerHTML = '';
            if (this.cssOnly) {
                DayPilot.Util.addClass(this.nav.top, this.$1C("_main"));
            } else {
                this.nav.top.style.lineHeight = "1.2";
                this.nav.top.style.textAlign = "left";
            };
            this.nav.top.style.MozUserSelect = 'none';
            this.nav.top.style.KhtmlUserSelect = 'none';
            this.nav.top.style.position = 'relative';
            this.nav.top.style.width = this.width ? this.width : '100%';
            if (this.hideUntilInit) {
                this.nav.top.style.visibility = 'hidden';
            };
            this.nav.scroll = document.createElement("div");
            this.nav.scroll.style.height = this.getScrollableHeight() + "px";
            if (this.heightSpec === 'BusinessHours') {
                this.nav.scroll.style.overflow = "auto";
            } else {
                this.nav.scroll.style.overflow = "hidden";
            };
            this.nav.scroll.style.position = "relative";
            if (!this.cssOnly) {
                this.nav.scroll.style.border = "1px solid " + this.borderColor;
                this.nav.scroll.style.backgroundColor = this.hourNameBackColor;
            };
            var $0x = this.drawTopHeaderDiv();
            this.nav.top.appendChild($0x);
            this.nav.scroll.style.zoom = 1;
            var $0y = this.drawScrollable();
            this.nav.scrollable = $0y.firstChild;
            this.nav.scroll.appendChild($0y);
            this.nav.top.appendChild(this.nav.scroll);
            this.nav.scrollLayer = document.createElement("div");
            this.nav.scrollLayer.style.position = 'absolute';
            this.nav.scrollLayer.style.top = '0px';
            this.nav.scrollLayer.style.left = '0px';
            this.nav.top.appendChild(this.nav.scrollLayer);
            this.nav.loading = document.createElement("div");
            this.nav.loading.style.position = 'absolute';
            this.nav.loading.style.top = '0px';
            this.nav.loading.style.left = (this.hourWidth + 5) + "px";
            this.nav.loading.style.backgroundColor = this.loadingLabelBackColor;
            this.nav.loading.style.fontSize = this.loadingLabelFontSize;
            this.nav.loading.style.fontFamily = this.loadingLabelFontFamily;
            this.nav.loading.style.color = this.loadingLabelFontColor;
            this.nav.loading.style.padding = '2px';
            this.nav.loading.innerHTML = this.loadingLabelText;
            this.nav.loading.style.display = 'none';
            this.nav.top.appendChild(this.nav.loading);
        };
        this.drawHourTable = function() {
            if (!this.fasterDispose) DayPilot.pu(this.nav.hourTable);
            this.nav.scrollable.rows[0].cells[0].innerHTML = '';
            this.nav.hourTable = this.createHourTable();
            this.nav.scrollable.rows[0].cells[0].appendChild(this.nav.hourTable);
        };
        this.drawScrollable = function() {
            var $0z = document.createElement("div");
            $0z.style.zoom = 1;
            $0z.style.position = 'relative';
            var $0A = document.createElement("table");
            $0A.cellSpacing = "0";
            $0A.cellPadding = "0";
            $0A.border = "0";
            $0A.style.border = "0px none";
            $0A.style.width = "100%";
            $0A.style.position = 'absolute';
            var r = $0A.insertRow(-1);
            var c;
            c = r.insertCell(-1);
            c.valign = "top";
            c.style.padding = '0px';
            c.style.border = '0px none';
            this.nav.hourTable = this.createHourTable();
            c.appendChild(this.nav.hourTable);
            c = r.insertCell(-1);
            c.valign = "top";
            c.width = "100%";
            c.style.padding = '0px';
            c.style.border = '0px none';
            if (!this.cssOnly) {
                c.appendChild(this.createEventsAndCells());
            } else {
                var $0y = document.createElement("div");
                $0y.style.position = "relative";
                c.appendChild($0y);
                $0y.appendChild(this.createEventsAndCells());
                $0y.appendChild(this.$1D());
            };
            $0z.appendChild($0A);
            this.nav.zoom = $0z;
            return $0z;
        };
        this.createEventsAndCells = function() {
            var $0A = document.createElement("table");
            $0A.cellPadding = "0";
            $0A.cellSpacing = "0";
            $0A.border = "0";
            $0A.style.width = "100%";
            $0A.style.border = "0px none";
            $0A.style.tableLayout = 'fixed';
            if (!this.cssOnly) {
                $0A.style.borderLeft = "1px solid " + this.borderColor;
            };
            this.nav.main = $0A;
            this.nav.events = $0A;
            return $0A;
        };
        this.$1D = function() {
            var $0A = document.createElement("table");
            $0A.style.top = "0px";
            $0A.cellPadding = "0";
            $0A.cellSpacing = "0";
            $0A.border = "0";
            $0A.style.position = "absolute";
            $0A.style.width = "100%";
            $0A.style.border = "0px none";
            $0A.style.tableLayout = 'fixed';
            this.nav.events = $0A;
            var $0B = true;
            var $07 = this.columns;
            var cl = $07.length;
            var r = ($0B) ? $0A.insertRow(-1) : $0A.rows[0];
            for (var j = 0; j < cl; j++) {
                var c = ($0B) ? r.insertCell(-1) : r.cells[j];
                if ($0B) {
                    c.style.padding = '0px';
                    c.style.border = '0px none';
                    c.style.height = '0px';
                    c.style.overflow = 'visible';
                    if (!$c.rtl) {
                        c.style.textAlign = 'left';
                    };
                    var $Y = document.createElement("div");
                    $Y.style.marginRight = $c.columnMarginRight + "px";
                    $Y.style.position = 'relative';
                    $Y.style.height = '1px';
                    if (!this.cssOnly) {
                        $Y.style.fontSize = '1px';
                        $Y.style.lineHeight = '1.2';
                    };
                    $Y.style.marginTop = '-1px';
                    c.appendChild($Y);
                }
            };
            return $0A;
        };
        this.createHourTable = function() {
            var $0A = document.createElement("table");
            $0A.cellSpacing = "0";
            $0A.cellPadding = "0";
            $0A.border = "0";
            $0A.style.border = '0px none';
            $0A.style.width = this.hourWidth + "px";
            $0A.oncontextmenu = function() {
                return false;
            };
            var $0C = this.cssOnly ? 0 : 1;
            if ($0C) {
                var r = $0A.insertRow(-1);
                r.style.height = "1px";
                r.style.backgroundColor = "white";
                var c = r.insertCell(-1);
                c.style.padding = '0px';
                c.style.border = '0px none';
            };
            var $0D = 24;
            for (var i = 0; i < $0D; i++) {
                this.createHourRow($0A, i);
            };
            return $0A;
        };
        this.createHourRow = function($0A, i) {
            var $h = (this.cellHeight * 2);
            var r = $0A.insertRow(-1);
            r.style.height = $h + "px";
            var c = r.insertCell(-1);
            c.valign = "bottom";
            
            //c.unselectable = "on";
            if (!this.cssOnly) {
                c.style.backgroundColor = this.hourNameBackColor;
            };
            c.style.cursor = "default";
            c.style.padding = '0px';
            c.style.border = '0px none';
            var $0E = document.createElement("div");
            
            $0E.style.position = "relative";
            if (this.cssOnly) {
                $0E.className = this.$1C("_rowheader");
            };
            $0E.style.width = this.hourWidth + "px";
            $0E.style.height = ($h) + "px";
            $0E.style.overflow = 'hidden';
            //$0E.unselectable = 'on';
            var $02 = document.createElement("div");
            
            if (this.cssOnly) {
                $02.className = this.$1C("_rowheader_inner");
            } else {
                $02.style.borderBottom = "1px solid " + this.hourNameBorderColor;
                $02.style.textAlign = "right";
            };
            $02.style.height = ($h - 1) + "px";
            //$02.unselectable = "off";
            var $0r = document.createElement("div");
            if (!this.cssOnly) {
                $0r.style.padding = "2px";
                $0r.style.fontFamily = this.hourFontFamily;
                $0r.style.fontSize = this.hourFontSize;
                $0r.style.color = this.hourFontColor;
            };
            //$0r.unselectable = "off";
            
            var $K = this.startDate.addHours(i);
            var $0p = $K.getHours();
            var am = $0p < 12;
            if (this.timeFormat === "Clock12Hours") {
                $0p = $0p % 12;
                if ($0p === 0) {
                    $0p = 12;
                }
            };
            $0r.innerHTML = $0p;
            var $0F = document.createElement("span");
           
            //$0F.unselectable = "off";
            if (!this.cssOnly) {
                $0F.style.fontSize = "10px";
                $0F.style.verticalAlign = "super";
            } else {
                $0F.className = this.$1C("_rowheader_minutes");
            };
            var $0G;
            if (this.timeFormat === "Clock12Hours") {
                if (am) {
                    $0G = "AM2";
                } else {
                    $0G = "PM2";
                }
            } else {
                $0G = "00";
            };
            if (!this.cssOnly) {
                $0F.innerHTML = "&nbsp;" + $0G;
            } else {
                $0F.innerHTML = $0G;
            };
            
            //$02.onclick = function(){alert('click hour1 am2 pm2')};
            $0r.onclick = function(){alert('click hour2 am2 pm2')};
            //$0E.onclick = function(){alert('click hour3 am2 pm2')};
            c.onclick = function(){alert('click hour4 am2 pm2')};
            $0r.appendChild($0F);
            $02.appendChild($0r);
            $0E.appendChild($02);
            c.appendChild($0E);
        };
        this.getScrollableHeight = function() {
            switch (this.heightSpec) {
                case "Full":
                    return (24 * 2 * this.cellHeight);
                case "BusinessHours":
                    var $0H = this.businessHoursSpan();
                    return $0H * this.cellHeight * 2;
                default:
                    throw "DayPilot.Calendar: Unexpected 'heightSpec' value.";
            }
        };
        this.drawTopHeaderDiv = function() {
            var $0x = document.createElement("div");
            if (!this.cssOnly) {
                $0x.style.borderLeft = "1px solid " + this.borderColor;
                $0x.style.borderRight = "1px solid " + this.borderColor;
            };
            $0x.style.overflow = "auto";
            var $0A = document.createElement("table");
            $0A.cellPadding = "0";
            $0A.cellSpacing = "0";
            $0A.border = "0";
            $0A.style.width = "100%";
            $0A.style.borderCollapse = 'separate';
            $0A.style.border = "0px none";
            var r = $0A.insertRow(-1);
            var c = r.insertCell(-1);
            c.style.padding = '0px';
            c.style.border = '0px none';
            var $0I = this.drawCorner();
            c.appendChild($0I);
            this.nav.corner = $0I;
            c = r.insertCell(-1);
            c.style.width = "100%";
            if (!this.cssOnly) {
                c.style.backgroundColor = this.hourNameBackColor;
            };
            c.valign = "top";
            c.style.position = 'relative';
            c.style.padding = '0px';
            c.style.border = '0px none';
            this.nav.header = document.createElement("table");
            this.nav.header.cellPadding = "0";
            this.nav.header.cellSpacing = "0";
            this.nav.header.border = "0";
            this.nav.header.width = "100%";
            this.nav.header.style.tableLayout = "fixed";
            if (!this.cssOnly) {
                this.nav.header.style.borderBottom = "0px none #000000";
                this.nav.header.style.borderRight = "0px none #000000";
                this.nav.header.style.borderLeft = "1px solid " + this.borderColor;
                this.nav.header.style.borderTop = "1px solid " + this.borderColor;
            };
            this.nav.header.oncontextmenu = function() {
                return false;
            };
            var $0J = this.nav.scroll.style.overflow !== 'hidden';
            if (!this.cssOnly) {
                if ($0J) {
                    this.nav.header.style.borderRight = "1px solid " + this.borderColor;
                }
            };
            c.appendChild(this.nav.header);
            if ($0J) {
                c = r.insertCell(-1);
                c.unselectable = "on";
                if (!this.cssOnly) {
                    c.style.backgroundColor = this.hourNameBackColor;
                    c.style.borderTop = "1px solid " + this.borderColor;
                    c.style.borderBottom = "0px none";
                    c.style.borderLeft = "0px none";
                    c.style.borderRight = "0px none";
                    c.style.padding = '0px';
                    c.style.verticalAlign = 'top';
                    c.innerHTML = "&nbsp;";
                };
                var $0m = document.createElement("div");
                $0m.unselectable = "on";
                $0m.style.position = "relative";
                $0m.style.width = "16px";
                if (!this.cssOnly) {
                    $0m.style.lineHeight = "1px";
                    $0m.style.fontSize = "1px";
                    $0m.style.height = "1px";
                } else {
                    $0m.style.height = this.headerHeight + "px";
                    $0m.className = this.$1C("_cornerright");
                    var $0s = document.createElement("div");
                    $0s.className = this.$1C('_cornerright_inner');
                    $0m.appendChild($0s);
                };
                c.appendChild($0m);
                this.nav.cornerRight = $0m;
            };
            $0x.appendChild($0A);
            return $0x;
        };
        this.drawCorner = function() {
            var $0y = document.createElement("div");
            $0y.style.position = 'relative';
            if (this.cssOnly) {
                $0y.className = this.$1C("_corner");
            } else {
                $0y.style.backgroundColor = this.hourNameBackColor;
                $0y.style.fontFamily = this.headerFontFamily;
                $0y.style.fontSize = this.headerFontSize;
                $0y.style.color = this.headerFontColor;
                $0y.style.borderTop = "1px solid " + this.borderColor;
            };
            $0y.style.width = this.hourWidth + "px";
            $0y.style.height = this.headerHeight + "px";
            $0y.oncontextmenu = function() {
                return false;
            };
            var $0I = document.createElement("div");
            $0I.unselectable = "on";
            if (this.cssOnly) {
                $0I.className = this.$1C("_corner_inner");
            };
            $0y.appendChild($0I);
            return $0y;
        };
        this.disposeMain = function() {
            var $0A = this.nav.main;
            $0A.root = null;
            $0A.onmouseup = null;
            for (var y = 0; y < $0A.rows.length; y++) {
                var r = $0A.rows[y];
                for (var x = 0; x < r.cells.length; x++) {
                    var c = r.cells[x];
                    c.root = null;
                    c.onmousedown = null;
                    c.onmousemove = null;
                    c.onmouseout = null;
                    c.onmouseup = null;
                }
            };
            if (!this.fasterDispose) DayPilot.pu($0A);
        };
        this.drawMain = function() {
            var $0K = [];
            var $0L = [];
            var $0A = this.nav.main;
            var $M = 30 * 60 * 1000;
            var $0M = this.rowCount();
            var $07 = $c.columns;
            var $0B = !this.tableCreated || $07.length !== $0A.rows[0].cells.length || $0M !== $0A.rows.length;
            if ($0A) {
                this.disposeMain();
            }
            while ($0A && $0A.rows && $0A.rows.length > 0 && $0B) {
                if (!this.fasterDispose) {
                    DayPilot.pu($0A.rows[0]);
                };
                $0A.deleteRow(0);
            };
            this.tableCreated = true;
            var cl = $07.length;
            if (this.cssOnly) {
                var $0N = this.nav.events;
                while ($0N && $0N.rows && $0N.rows.length > 0 && $0B) {
                    if (!this.fasterDispose) {
                        DayPilot.pu($0N.rows[0]);
                    };
                    $0N.deleteRow(0);
                };
                var cl = $07.length;
                var r = ($0B) ? $0N.insertRow(-1) : $0N.rows[0];
                for (var j = 0; j < cl; j++) {
                    var c = ($0B) ? r.insertCell(-1) : r.cells[j];
                    if ($0B) {
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.height = '0px';
                        c.style.overflow = 'visible';
                        if (!$c.rtl) {
                            c.style.textAlign = 'left';
                        };
                        var $Y = document.createElement("div");
                        $Y.style.marginRight = $c.columnMarginRight + "px";
                        $Y.style.position = 'relative';
                        $Y.style.height = '1px';
                        if (!this.cssOnly) {
                            $Y.style.fontSize = '1px';
                            $Y.style.lineHeight = '1.2';
                        };
                        $Y.style.marginTop = '-1px';
                        c.appendChild($Y);
                    }
                }
            };
            if (!this.cssOnly) {
                var r = ($0B) ? $0A.insertRow(-1) : $0A.rows[0];
                if ($0B) {
                    r.style.backgroundColor = 'white';
                };
                for (var j = 0; j < cl; j++) {
                    var c = ($0B) ? r.insertCell(-1) : r.cells[j];
                    if ($0B) {
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.height = '1px';
                        c.style.overflow = 'visible';
                        c.style.width = (100.0 / $07.length) + "%";
                        var $Y = document.createElement("div");
                        $Y.style.display = 'block';
                        $Y.style.marginRight = $c.columnMarginRight + "px";
                        $Y.style.position = 'relative';
                        $Y.style.height = '1px';
                        $Y.style.fontSize = '1px';
                        $Y.style.lineHeight = '1.2';
                        $Y.style.marginTop = '-1px';
                        c.appendChild($Y);
                    }
                }
            };
            for (var i = 0; i < $0M; i++) {
                var $0C = this.cssOnly ? 0 : 1;
                var r = ($0B) ? $0A.insertRow(-1) : $0A.rows[i + $0C];
                if ($0B) {
                    r.style.MozUserSelect = 'none';
                    r.style.KhtmlUserSelect = 'none';
                };
                for (var j = 0; j < cl; j++) {
                    var $0v = this.columns[j];
                    var c = ($0B) ? r.insertCell(-1) : r.cells[j];
                    c.start = $0v.Start.addTime(i * $M);
                    c.end = c.start.addTime($M);
                    c.onmousedown = this.onCellMousedown;
                    c.onmousemove = this.mousemove;
                    c.onmouseup = function() {
                        return false;
                    };
                    c.onclick = function() {
                        return false;
                    };
                    if ($0B) {
                        c.root = this;
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.verticalAlign = 'top';
                        if (!this.cssOnly) {
                            if (j !== cl - 1) {
                                c.style.borderRight = '1px solid ' + $c.cellBorderColor;
                            }
                        };
                        c.style.height = $c.cellHeight + 'px';
                        c.style.overflow = 'hidden';
                        c.unselectable = 'on';
                        if (!this.cssOnly) {
                            var $Y = document.createElement("div");
                            $Y.unselectable = 'on';
                            $Y.style.fontSize = '1px';
                            $Y.style.height = '0px';
                            var $0O = (c.end.getMinutes() + c.end.getSeconds() + c.end.getMilliseconds()) > 0;
                            if ($0O) {
                                if ($c.hourHalfBorderColor !== '') {
                                    $Y.style.borderBottom = '1px solid ' + $c.hourHalfBorderColor;
                                }
                            } else {
                                if ($c.hourBorderColor !== '') {
                                    $Y.style.borderBottom = '1px solid ' + $c.hourBorderColor;
                                }
                            };
                            var $0P = document.createElement("div");
                            $0P.style.height = ($c.cellHeight - 1) + "px";
                            $0P.style.overflow = 'hidden';
                            $0P.unselectable = 'on';
                            c.appendChild($0P);
                        } else {
                            var $Y = document.createElement("div");
                            $Y.unselectable = 'on';
                            $Y.style.height = $c.cellHeight + "px";
                            $Y.style.position = "relative";
                            $Y.className = this.$1C("_cell");
                            var $0Q = this.$1E(c.start, c.end);
                            if ($0Q && this.cssOnly) {
                                DayPilot.Util.addClass($Y, $c.$1C("_cell_business"));
                            };
                            var $0s = document.createElement("div");
                            $0s.setAttribute("unselectable", "on");
                            $0s.className = this.$1C("_cell_inner");
                            $Y.appendChild($0s);
                            c.appendChild($Y);
                        };
                        c.appendChild($Y);
                    };
                    c.style.backgroundColor = $c.cellBackColor;
                    $0P = c.firstChild;
                }
            };
            $0A.onmouseup = this.mouseup;
            $0A.root = this;
            $c.nav.scrollable.onmousemove = function(ev) {
                ev = ev || window.event;
                var $0R = $c.nav.scrollable;
                $c.coords = DayPilot.mo3($0R, ev);
                var $Z = DayPilot.mc(ev);
                if (DayPilotCalendar.resizing) {
                    if (!DayPilotCalendar.resizingShadow) {
                        DayPilotCalendar.resizingShadow = $c.createShadow(DayPilotCalendar.resizing, false, $c.shadow);
                    };
                    var $0S = $c.cellHeight;
                    var $J = 1;
                    var $0T = ($Z.y - DayPilotCalendar.originalMouse.y);
                    if (DayPilotCalendar.resizing.dpBorder === 'bottom') {
                        var $0U = Math.floor(((DayPilotCalendar.originalHeight + DayPilotCalendar.originalTop + $0T) + $0S / 2) / $0S) * $0S - DayPilotCalendar.originalTop + $J;
                        if ($0U < $0S) $0U = $0S;
                        var $06 = $c.nav.main.clientHeight;
                        if (DayPilotCalendar.originalTop + $0U > $06) $0U = $06 - DayPilotCalendar.originalTop;
                        DayPilotCalendar.resizingShadow.style.height = ($0U - 4) + 'px';
                    } else if (DayPilotCalendar.resizing.dpBorder === 'top') {
                        var $0V = Math.floor(((DayPilotCalendar.originalTop + $0T - $J) + $0S / 2) / $0S) * $0S + $J;
                        if ($0V < $J) {
                            $0V = $J;
                        };
                        if ($0V > DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - $0S) {
                            $0V = DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - $0S;
                        };
                        var $0U = DayPilotCalendar.originalHeight - ($0V - DayPilotCalendar.originalTop) - 4;
                        if ($0U < $0S) {
                            $0U = $0S;
                        } else {
                            DayPilotCalendar.resizingShadow.style.top = $0V + 'px';
                        };
                        DayPilotCalendar.resizingShadow.style.height = ($0U) + 'px';
                    }
                } else if (DayPilotCalendar.moving) {
                    if (!DayPilotCalendar.movingShadow) {
                        DayPilotCalendar.movingShadow = $c.createShadow(DayPilotCalendar.moving, !$c.ie, $c.shadow);
                        DayPilotCalendar.movingShadow.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
                    };
                    if (!$c.coords) {
                        return;
                    };
                    var $0S = $c.cellHeight;
                    var $J = 1;
                    var $0j = DayPilotCalendar.moveOffsetY;
                    if (!$0j) {
                        $0j = $0S / 2;
                    };
                    var $0V = Math.floor((($c.coords.y - $0j - $J) + $0S / 2) / $0S) * $0S + $J;
                    if ($0V < $J) {
                        $0V = $J;
                    };
                    var $0c = $c.nav.events;
                    var $06 = $c.nav.main.clientHeight;
                    var $h = parseInt(DayPilotCalendar.movingShadow.style.height);
                    if ($0V + $h > $06) {
                        $0V = $06 - $h;
                    };
                    DayPilotCalendar.movingShadow.parentNode.style.display = 'none';
                    DayPilotCalendar.movingShadow.style.top = $0V + 'px';
                    DayPilotCalendar.movingShadow.parentNode.style.display = '';
                    var $0W = $0c.clientWidth / $0c.rows[0].cells.length;
                    var $l = Math.floor(($c.coords.x - 45) / $0W);
                    if ($l < 0) {
                        $l = 0;
                    };
                    if ($l < $0c.rows[0].cells.length && $l >= 0 && DayPilotCalendar.movingShadow.column !== $l) {
                        DayPilotCalendar.movingShadow.column = $l;
                        DayPilotCalendar.moveShadow($0c.rows[0].cells[$l]);
                    }
                }
            };
            $c.nav.scrollable.style.display = '';
        };
        this.$1E = function($K, end) {
            if (this.businessBeginsHour < this.businessEndsHour) {
                return !($K.getHours() < this.businessBeginsHour || $K.getHours() >= this.businessEndsHour || $K.getDayOfWeek() === 6 || $K.getDayOfWeek() === 0);
            };
            if ($K.getHours() >= this.businessBeginsHour) {
                return true;
            };
            if ($K.getHours() < this.businessEndsHour) {
                return true;
            };
            return false;
        };
        this.disposeHeader = function() {
            var $0A = this.nav.header;
            if ($0A && $0A.rows) {
                for (var y = 0; y < $0A.rows.length; y++) {
                    var r = $0A.rows[y];
                    for (var x = 0; x < r.cells.length; x++) {
                        var c = r.cells[x];
                        c.onclick = null;
                        c.onmousemove = null;
                        c.onmouseout = null;
                    }
                }
            };
            if (!this.fasterDispose) DayPilot.pu($0A);
        };
        this.drawHeaderRow = function($0B) {
            var r = ($0B) ? this.nav.header.insertRow(-1) : this.nav.header.rows[0];
            var $07 = this.columns;
            var $0X = $07.length;
            for (var i = 0; i < $0X; i++) {
                var $o = $07[i];
                var $d = ($0B) ? r.insertCell(-1) : r.cells[i];
                $d.data = $o;
                $d.style.overflow = 'hidden';
                $d.style.padding = '0px';
                $d.style.border = '0px none';
                $d.style.height = (this.headerHeight) + "px";
                var $Y = ($0B) ? document.createElement("div") : $d.firstChild;
                if ($0B) {
                    $Y.unselectable = 'on';
                    $Y.style.MozUserSelect = 'none';
                    $Y.style.backgroundColor = $o.BackColor;
                    $Y.style.cursor = 'default';
                    $Y.style.position = 'relative';
                    if (!this.cssOnly) {
                        $Y.style.fontFamily = this.headerFontFamily;
                        $Y.style.fontSize = this.headerFontSize;
                        $Y.style.color = this.headerFontColor;
                        if (i !== $0X - 1) {
                            $Y.style.borderRight = "1px solid " + this.borderColor;
                        }
                    } else {
                        $Y.className = $c.$1C('_colheader');
                    };
                    $Y.style.height = this.headerHeight + "px";
                    var $0r = document.createElement("div");
                    if (!this.cssOnly) {
                        $0r.style.position = 'absolute';
                        $0r.style.left = '0px';
                        $0r.style.width = '100%';
                        $0r.style.padding = "2px";
                        $Y.style.textAlign = 'center';
                    } else {
                        $0r.className = $c.$1C('_colheader_inner');
                    };
                    $0r.unselectable = 'on';
                    $Y.appendChild($0r);
                    $d.appendChild($Y);
                };
                var $0r = $Y.firstChild;
                $0r.innerHTML = $o.InnerHTML;
            }
        };
        this.widthUnit = function() {
            if (this.width && this.width.indexOf("px") !== -1) {
                return "Pixel";
            };
            return "Percentage";
        };
        this.drawHeader = function() {
            var $0x = this.nav.header;
            var $0B = true;
            var $07 = this.columns;
            var $0X = $07.length;
            if (this.headerCreated && $0x && $0x.rows && $0x.rows.length > 0) {
                $0B = $0x.rows[$0x.rows.length - 1].cells.length !== $0X;
            }
            while (this.headerCreated && $0x && $0x.rows && $0x.rows.length > 0 && $0B) {
                if (!this.fasterDispose) DayPilot.pu($0x.rows[0]);
                $0x.deleteRow(0);
            };
            this.headerCreated = true;
            if (!$0B) {
                var $0I = $c.nav.corner;
                if (!this.cssOnly) {
                    $0I.style.backgroundColor = $c.cornerBackColor;
                };
                if (!this.fasterDispose) DayPilot.pu($0I.firstChild);
            };
            this.drawHeaderRow($0B);
        };
        this.loadingStart = function() {
            if (this.loadingLabelVisible) {
                this.nav.loading.innerHTML = this.loadingLabelText;
                this.nav.loading.style.top = (this.headerHeight + 5) + "px";
                this.nav.loading.style.display = '';
            }
        };
        this.commandCallBack = function($0Y, $o) {
            var $G = {};
            $G.command = $0Y;
            this.callBack2('Command', $o, $G);
        };
        this.loadingStop = function($0Z) {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            this.nav.loading.style.display = 'none';
        };
        this.enableScrolling = function() {
            var $10 = this.nav.scroll;
            var $11 = (typeof this.$1F.scrollpos !== 'undefined') ? this.$1F.scrollpos : this.initScrollPos;
            if (!$11) {
                return;
            };
            if ($11 === 'Auto') {
                if (this.heightSpec === "BusinessHours") {
                    $11 = 2 * this.cellHeight * this.businessBeginsHour;
                } else {
                    $11 = 0;
                }
            };
            $10.root = this;
            if ($10.scrollTop === 0) {
                $10.scrollTop = $11;
            }
        };
        this.callbackError = function($z, $A) {
            alert("Error!\r\nResult: " + $z + "\r\nContext:" + $A);
        };
        this.fixScrollHeader = function() {
            var w = DayPilot.sw(this.nav.scroll);
            var d = this.nav.cornerRight;
            if (d && w > 0) {
                if (this.cssOnly) {
                    d.style.width = w + 'px';
                } else {
                    d.style.width = (w - 3) + 'px';
                }
            }
        };
        this.registerGlobalHandlers = function() {
            if (!DayPilotCalendar.globalHandlers) {
                DayPilotCalendar.globalHandlers = true;
                DayPilot.re(document, 'mouseup', DayPilotCalendar.gMouseUp);
                DayPilot.re(window, 'unload', DayPilotCalendar.gUnload);
            }
        };
        this.events = {};
        this.events.list = [];
        this.events.add = function(e) {
            e.calendar = $c;
            if (!$c.events.list) {
                $c.events.list = [];
            };
            $c.events.list.push(e.data);
            $c.update();
        };
        this.events.update = function(e) {
            e.commit();
            $c.update();
        };
        this.events.remove = function(e) {
            var $12 = DayPilot.indexOf($c.events.list, e.data);
            $c.events.list.splice($12, 1);
            $c.update();
        };
        this.update = function() {
            this.tableCreated = false;
            this.$1F.scrollpos = this.nav.scroll.scrollTop;
            this.deleteEvents();
            this.$1G();
            this.init();
            return;
            $c.prepareVariables();
            $c.deleteEvents();
            var $13 = true;
            if ($13) {
                $c.prepareColumns();
                $c.drawHeader();
                $c.drawMain();
                $c.drawHourTable();
                $c.updateHeight();
            };
            $c.loadEvents();
            $c.updateHeaderHeight();
            $c.show();
            $c.drawEvents();
            $c.clearSelection();
        };
        this.loadEvents = function($0N) {
            if (!$0N) {
                $0N = this.events.list;
            };
            var length = $0N.length;
            var $14 = 24 * 60 * 60 * 1000;
            this.cache.pixels = {};
            var $15 = [];
            this.scrollLabels = [];
            this.minStart = 10000;
            this.maxEnd = 0;
            if (!$0N) {
                return;
            };
            for (var i = 0; i < length; i++) {
                var e = $0N[i];
                e.start = new DayPilot.Date(e.start);
                e.end = new DayPilot.Date(e.end);
            };
            for (var i = 0; i < this.columns.length; i++) {
                var scroll = {};
                scroll.minEnd = 1000000;
                scroll.maxStart = -1;
                this.scrollLabels.push(scroll);
                var $0v = this.columns[i];
                $0v.events = [];
                $0v.lines = [];
                $0v.blocks = [];
                var $16 = new DayPilot.Date($0v.Start);
                var $17 = $16.getTime();
                var $18 = $16.addTime($14);
                var $19 = $18.getTime();
                for (var j = 0; j < length; j++) {
                    if ($15[j]) {
                        continue;
                    };
                    var e = $0N[j];
                    var $K = e.start;
                    var end = e.end;
                    var $1a = $K.getTime();
                    var $1b = end.getTime();
                    if ($1b < $1a) {
                        continue;
                    };
                    var $1c = !($1b <= $17 || $1a >= $19);
                    if ($1c) {
                        var ep = new DayPilot.Event(e, $c);
                        ep.part.dayIndex = i;
                        ep.part.start = $17 < $1a ? e.start : $16;
                        ep.part.end = $19 > $1b ? e.end : $18;
                        var $1d = this.getPixels(ep.part.start, $0v.Start);
                        var $1e = this.getPixels(ep.part.end, $0v.Start);
                        var top = $1d.top;
                        var $1f = $1e.top;
                        if (top === $1f && ($1d.cut || $1e.cut)) {
                            continue;
                        };
                        var $1g = $1e.boxBottom;
                        ep.part.top = Math.floor(top / this.cellHeight) * this.cellHeight;
                        if (!this.cssOnly) {
                            ep.part.top += 1;
                        };
                        ep.part.height = Math.max(Math.ceil($1g / this.cellHeight) * this.cellHeight - ep.part.top, this.cellHeight - 1) + 1;
                        var $K = ep.part.top;
                        var end = ep.part.top + ep.part.height;
                        if ($K > scroll.maxStart) {
                            scroll.maxStart = $K;
                        };
                        if (end < scroll.minEnd) {
                            scroll.minEnd = end;
                        };
                        if ($K < this.minStart) {
                            this.minStart = $K;
                        };
                        if (end > this.maxEnd) {
                            this.maxEnd = end;
                        };
                        $0v.events.push(ep);
                        if (ep.part.start.getTime() === $1a && ep.part.end.getTime() === $1b) {
                            $15[j] = true;
                        }
                    }
                }
            };
            for (var i = 0; i < this.columns.length; i++) {
                var $0v = this.columns[i];
                $0v.events.sort(this.eventComparer);
                for (var j = 0; j < $0v.events.length; j++) {
                    var e = $0v.events[j];
                    $0v.putIntoBlock(e);
                };
                for (var j = 0; j < $0v.blocks.length; j++) {
                    var $02 = $0v.blocks[j];
                    $02.events.sort(this.eventComparer);
                    for (var k = 0; k < $02.events.length; k++) {
                        var e = $02.events[k];
                        $02.putIntoLine(e);
                    }
                }
            }
        };
        this.eventComparer = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0;
            };
            var $1h = a.start().getTime() - b.start().getTime();
            if ($1h !== 0) {
                return $1h;
            };
            var $1i = b.end().getTime() - a.end().getTime();
            return $1i;
        };
        this.debug = function($0Z, $1j) {
            if (!this.debuggingEnabled) {
                return;
            };
            if (!$c.debugMessages) {
                $c.debugMessages = [];
            };
            $c.debugMessages.push($0Z);
            if (typeof console !== 'undefined') {
                console.log($0Z);
            }
        };
        this.getPixels = function($S, $K) {
            if (!$K) $K = this.startDate;
            var $1a = $K.getTime();
            var $1k = $S.getTime();
            var $1l = this.cache.pixels[$1k + "_" + $1a];
            if ($1l) {
                return $1l;
            };
            $1a = $K.getTime();
            var $1m = 30 * 60 * 1000;
            var $1n = $1k - $1a;
            var $1o = $1n % $1m;
            var $1p = $1n - $1o;
            var $1q = $1p + $1m;
            if ($1o === 0) {
                $1q = $1p;
            };
            var $z = {};
            $z.cut = false;
            $z.top = this.ticksToPixels($1n);
            $z.boxTop = this.ticksToPixels($1p);
            $z.boxBottom = this.ticksToPixels($1q);
            this.cache.pixels[$1k + "_" + $1a] = $z;
            return $z;
        };
        this.ticksToPixels = function($1k) {
            return Math.floor((this.cellHeight * $1k) / (1000 * 60 * 30));
        };
        this.prepareVariables = function() {
            this.startDate = new DayPilot.Date(this.startDate);
        };
        this.updateHeaderHeight = function() {
            if (this.nav.corner) {
                this.nav.corner.style.height = this.headerHeight + "px";
            }
        };
        this.updateHeight = function() {
            var sh = this.getScrollableHeight();
            if (this.nav.scroll && sh > 0) {
                this.nav.scroll.style.height = sh + "px";
            }
        };
        this.$1H = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $c.events.list === 'undefined') || (!$c.events.list);
            } else {
                return false;
            }
        };
        this.show = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };
        this.initShort = function() {
            this.prepareVariables();
            this.prepareColumns();
            this.drawTop();
            this.drawHeader();
            this.drawMain();
            this.fixScrollHeader();
            this.enableScrolling();
            this.registerGlobalHandlers();
            DayPilotCalendar.register(this);
            this.callBack2('Init');
        };
        this.$1F = {};
        this.$1I = function() {
            this.$1F.themes = [];
            this.$1F.themes.push(this.theme || this.cssClassPrefix);
        };
        this.$1G = function() {
            var $1r = this.$1F.themes;
            for (var i = 0; i < $1r.length; i++) {
                var $1s = $1r[i];
                DayPilot.Util.removeClass(this.nav.top, $1s + "_main");
            };
            this.$1F.themes = [];
        };
        this.init = function() {
            var $1t = this.$1H();
            loadDefaultCss();
            this.$1I();
            if ($1t) {
                this.initShort();
                return;
            };
            this.prepareVariables();
            this.prepareColumns();
            if (this.events) {
                this.loadEvents();
            };
            this.drawTop();
            this.drawHeader();
            this.drawMain();
            this.show();
            this.fixScrollHeader();
            this.enableScrolling();
            this.registerGlobalHandlers();
            DayPilotCalendar.register(this);
            if (this.events) {
                this.updateHeaderHeight();
                this.drawEvents();
            };
            this.afterRender(null, false);
        };
        this.Init = this.init;
    };
    DayPilotCalendar.Cell = function($K, end, $l) {
        this.start = $K;
        this.end = end;
        this.column = function() {};
    };
    DayPilotCalendar.Column = function($1u, name, $S) {
        this.value = $1u;
        this.name = name;
        this.date = new DayPilot.Date($S);
    };
    DayPilot.Calendar = DayPilotCalendar.Calendar;
    if (typeof jQuery === 'undefined') {
        return;
    };
    (function($) {
        $.fn.daypilotCalendar = function($1v) {
            var $1w = null;
            var j = this.each(function() {
                if (this.daypilot) {
                    return;
                };
                var $1x = new DayPilot.Calendar(this.id);
                this.daypilot = $1x;
                for (name in $1v) {
                    $1x[name] = $1v[name];
                };
                $1x.Init();
                if (!$1w) {
                    $1w = $1x;
                }
            });
            if (this.length === 1) {
                return $1w;
            } else {
                return j;
            }
        };
    })(jQuery);
})();


if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
(function() {
    if (typeof DayPilot.$ !== 'undefined') {
        return;
    };
    DayPilot.$ = function(id) {
        return document.getElementById(id);
    };
    DayPilot.isKhtml = (navigator && navigator.userAgent && navigator.userAgent.indexOf("KHTML") !== -1);
    DayPilot.isIE = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
    DayPilot.mo2 = function($a, ev) {
        ev = ev || window.event;
        if (typeof(ev.offsetX) !== 'undefined') {
            var $b = {
                x: ev.offsetX + 1,
                y: ev.offsetY + 1
            };
            if (!$a) {
                return $b;
            };
            var $c = ev.srcElement;
            while ($c && $c !== $a) {
                if ($c.tagName !== 'SPAN') {
                    $b.x += $c.offsetLeft;
                    if ($c.offsetTop > 0) {
                        $b.y += $c.offsetTop - $c.scrollTop;
                    }
                };
                $c = $c.offsetParent;
            };
            if ($c) {
                return $b;
            };
            return null;
        };
        if (typeof(ev.layerX) !== 'undefined') {
            var $b = {
                x: ev.layerX,
                y: ev.layerY,
                $d: ev.target
            };
            if (!$a) {
                return $b;
            };
            var $c = ev.target;
            while ($c && $c.style.position != 'absolute' && $c.style.position != 'relative') {
                $c = $c.parentNode;
                if (DayPilot.isKhtml) {
                    $b.y += $c.scrollTop;
                }
            }
            while ($c && $c != $a) {
                $b.x += $c.offsetLeft;
                $b.y += $c.offsetTop - $c.scrollTop;
                $c = $c.offsetParent;
            };
            if ($c) {
                return $b;
            };
            return null;
        };
        return null;
    };
    DayPilot.mo3 = function($a, ev, $e) {
        ev = ev || window.event;
        if (typeof(ev.pageX) !== 'undefined') {
            var $f = DayPilot.abs($a, $e);
            var $b = {
                x: ev.pageX - $f.x,
                y: ev.pageY - $f.y
            };
            return $b;
        };
        return DayPilot.mo2($a, ev);
    };
    DayPilot.abs = function(element, $g) {
        if (!element) {
            return null;
        };
        var r = {
            x: element.offsetLeft,
            y: element.offsetTop,
            w: element.clientWidth,
            h: element.clientHeight,
            toString: function() {
                return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
            }
        };
        if (element.getBoundingClientRect) {
            var b = element.getBoundingClientRect();
            r.x = b.left;
            r.y = b.top;
            var d = DayPilot.doc();
            r.x -= d.clientLeft || 0;
            r.y -= d.clientTop || 0;
            var $h = DayPilot.pageOffset();
            r.x += $h.x;
            r.y += $h.y;
            if ($g) {
                var $i = DayPilot.absOffsetBased(element, false);
                var $g = DayPilot.absOffsetBased(element, true);
                r.x += $g.x - $i.x;
                r.y += $g.y - $i.y;
                r.w = $g.w;
                r.h = $g.h;
            };
            return r;
        } else {
            return DayPilot.absOffsetBased(element, $g);
        }
    };
    DayPilot.absOffsetBased = function(element, $g) {
        var r = {
            x: element.offsetLeft,
            y: element.offsetTop,
            w: element.clientWidth,
            h: element.clientHeight,
            toString: function() {
                return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
            }
        };
        while (element.offsetParent) {
            element = element.offsetParent;
            r.x -= element.scrollLeft;
            r.y -= element.scrollTop;
            if ($g) {
                if (r.x < 0) {
                    r.w += r.x;
                    r.x = 0;
                };
                if (r.y < 0) {
                    r.h += r.y;
                    r.y = 0;
                };
                if (element.scrollLeft > 0 && r.x + r.w > element.clientWidth) {
                    r.w -= r.x + r.w - element.clientWidth;
                };
                if (element.scrollTop && r.y + r.h > element.clientHeight) {
                    r.h -= r.y + r.h - element.clientHeight;
                }
            };
            r.x += element.offsetLeft;
            r.y += element.offsetTop;
        };
        var $h = DayPilot.pageOffset();
        r.x += $h.x;
        r.y += $h.y;
        return r;
    };
    DayPilot.sheet = function() {
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        if (!style.styleSheet) {
            style.appendChild(document.createTextNode(""));
        };
        var h = document.head || document.getElementsByTagName('head')[0];
        h.appendChild(style);
        var $j = !!style.styleSheet;
        var $k = {};
        $k.rules = [];
        $k.commit = function() {
            if ($j) {
                style.styleSheet.cssText = this.rules.join("\n");
            }
        };
        $k.add = function($l, $m, $n) {
            if ($j) {
                this.rules.push($l + "{" + $m + "\u007d");
                return;
            };
            if (style.sheet.insertRule) {
                style.sheet.insertRule($l + "{" + $m + "\u007d", $n);
            } else if (style.sheet.addRule) {
                style.sheet.addRule($l, $m, $n);
            }
        };
        return $k;
    };
    DayPilot.doc = function() {
        var de = document.documentElement;
        return (de && de.clientHeight) ? de : document.body;
    };
    DayPilot.guid = function() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return ("" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    DayPilot.pageOffset = function() {
        if (typeof pageXOffset !== 'undefined') {
            return {
                x: pageXOffset,
                y: pageYOffset
            };
        };
        var d = DayPilot.doc();
        return {
            x: d.scrollLeft,
            y: d.scrollTop
        };
    };
    DayPilot.indexOf = function($o, $p) {
        if (!$o || !$o.length) {
            return -1;
        };
        for (var i = 0; i < $o.length; i++) {
            if ($o[i] === $p) {
                return i;
            }
        };
        return -1;
    };
    DayPilot.mc = function(ev) {
        if (ev.pageX || ev.pageY) {
            return {
                x: ev.pageX,
                y: ev.pageY
            };
        };
        return {
            x: ev.clientX + document.documentElement.scrollLeft,
            y: ev.clientY + document.documentElement.scrollTop
        };
    };
    DayPilot.re = function(el, ev, $q) {
        if (el.addEventListener) {
            el.addEventListener(ev, $q, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + ev, $q);
        }
    };
    DayPilot.pu = function(d) {
        var a = d.attributes,
            i, l, n;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                if (!a[i]) {
                    continue;
                };
                n = a[i].name;
                if (typeof d[n] === 'function') {
                    d[n] = null;
                }
            }
        };
        a = d.childNodes;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                var $r = DayPilot.pu(d.childNodes[i]);
            }
        }
    };
    DayPilot.de = function(e) {
        if (!e) {
            return;
        };
        if (!e.parentNode) {
            return;
        };
        e.parentNode.removeChild(e);
    };
    DayPilot.sw = function(element) {
        if (!element) {
            return 0;
        };
        return element.offsetWidth - element.clientWidth;
    };
    DayPilot.Selection = function($s, end, $t, $u) {
        this.type = 'selection';
        this.start = $s.isDayPilotDate ? $s : new DayPilot.Date($s);
        this.end = end.isDayPilotDate ? end : new DayPilot.Date(end);
        this.resource = $t;
        this.root = $u;
        this.toJSON = function($v) {
            var $w = {};
            $w.start = this.start;
            $w.end = this.end;
            $w.resource = this.resource;
            return $w;
        };
    };
    DayPilot.request = function($x, $y, $z, $A) {
        var $B = DayPilot.createXmlHttp();
        if (!$B) {
            return;
        };
        $B.open("POST", $x, true);
        $B.setRequestHeader('Content-type', 'text/plain');
        $B.onreadystatechange = function() {
            if ($B.readyState !== 4) return;
            if ($B.status !== 200 && $B.status !== 304) {
                if ($A) {
                    $A($B);
                } else {
                    if (console) {
                        console.log('HTTP error ' + $B.status);
                    }
                };
                return;
            };
            $y($B);
        };
        if ($B.readyState === 4) {
            return;
        };
        if (typeof $z === 'object') {
            $z = DayPilot.JSON.stringify($z);
        };
        $B.send($z);
    };
    DayPilot.createXmlHttp = function() {
        var $C;
        try {
            $C = new XMLHttpRequest();
        } catch (e) {
            try {
                $C = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        };
        return $C;
    };
    DayPilot.Util = {};
    DayPilot.Util.addClass = function($p, name) {
        if (!$p) {
            return;
        };
        if (!$p.className) {
            $p.className = name;
            return;
        };
        var $D = new RegExp("(^|\\s)" + name + "($|\\s)");
        if (!$D.test($p.className)) {
            $p.className = $p.className + ' ' + name;
        }
    };
    DayPilot.Util.removeClass = function($p, name) {
        if (!$p) {
            return;
        };
        var $D = new RegExp("(^|\\s)" + name + "($|\\s)");
        $p.className = $p.className.replace($D, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    DayPilot.Date = function($E, $F) {
        this.isDayPilotDate = true;
        if (typeof $E === 'undefined') {
            this.d = DayPilot.Date.fromLocal();
        } else if (typeof $E === "string") {
            return DayPilot.Date.fromStringSortable($E);
        } else if ($E.isDayPilotDate) {
            return $E;
        } else if (!$E.getFullYear) {
            throw "date parameter is not a Date object: " + $E;
        } else if ($F) {
            this.d = DayPilot.Date.fromLocal($E);
        } else {
            this.d = $E;
        };
        this.ticks = this.d.getTime();
        this.value = this.toStringSortable();
    };
    DayPilot.Date.prototype.addDays = function($G) {
        return new DayPilot.Date(DayPilot.Date.addDays(this.d, $G));
    };
    DayPilot.Date.prototype.addHours = function($H) {
        return this.addTime($H * 60 * 60 * 1000);
    };
    DayPilot.Date.prototype.addMilliseconds = function($I) {
        return this.addTime($I);
    };
    DayPilot.Date.prototype.addMinutes = function($J) {
        return this.addTime($J * 60 * 1000);
    };
    DayPilot.Date.prototype.addMonths = function($K) {
        return new DayPilot.Date(DayPilot.Date.addMonths(this.d, $K));
    };
    DayPilot.Date.prototype.addSeconds = function($L) {
        return this.addTime($L * 1000);
    };
    DayPilot.Date.prototype.addTime = function($M) {
        return new DayPilot.Date(DayPilot.Date.addTime(this.d, $M));
    };
    DayPilot.Date.prototype.addYears = function($N) {
        var n = this.clone();
        n.d.setUTCFullYear(this.getYear() + $N);
        return n;
    };
    DayPilot.Date.prototype.clone = function() {
        return new DayPilot.Date(DayPilot.Date.clone(this.d));
    };
    DayPilot.Date.prototype.dayOfWeek = function() {
        return this.d.getUTCDay();
    };
    DayPilot.Date.prototype.daysInMonth = function() {
        return DayPilot.Date.daysInMonth(this.d);
    };
    DayPilot.Date.prototype.getDayOfWeek = function() {
        return this.d.getUTCDay();
    };
    DayPilot.Date.prototype.dayOfYear = function() {
        return Math.ceil((this.getDatePart().getTime() - this.firstDayOfYear().getTime()) / 86400000) + 1;
    };
    DayPilot.Date.prototype.equals = function($O) {
        if ($O === null) {
            return false;
        };
        if ($O.isDayPilotDate) {
            return DayPilot.Date.equals(this.d, $O.d);
        } else {
            throw "The parameter must be a DayPilot.Date object (DayPilot.Date.equals())";
        }
    };
    DayPilot.Date.prototype.firstDayOfMonth = function() {
        var $P = DayPilot.Date.firstDayOfMonth(this.getYear(), this.getMonth() + 1);
        return new DayPilot.Date($P);
    };
    DayPilot.Date.prototype.firstDayOfYear = function() {
        var $Q = this.getYear();
        var d = new Date();
        d.setUTCFullYear($Q, 0, 1);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.firstDayOfWeek = function($R) {
        var $P = DayPilot.Date.firstDayOfWeek(this.d, $R || 0);
        return new DayPilot.Date($P);
    };
    DayPilot.Date.prototype.getDay = function() {
        return this.d.getUTCDate();
    };
    DayPilot.Date.prototype.getDatePart = function() {
        return new DayPilot.Date(DayPilot.Date.getDate(this.d));
    };
    DayPilot.Date.prototype.getYear = function() {
        return this.d.getUTCFullYear();
    };
    DayPilot.Date.prototype.getHours = function() {
        return this.d.getUTCHours();
    };
    DayPilot.Date.prototype.getMilliseconds = function() {
        return this.d.getUTCMilliseconds();
    };
    DayPilot.Date.prototype.getMinutes = function() {
        return this.d.getUTCMinutes();
    };
    DayPilot.Date.prototype.getMonth = function() {
        return this.d.getUTCMonth();
    };
    DayPilot.Date.prototype.getSeconds = function() {
        return this.d.getUTCSeconds();
    };
    DayPilot.Date.prototype.getTotalTicks = function() {
        return this.getTime();
    };
    DayPilot.Date.prototype.getTime = function() {
        if (typeof this.ticks !== 'number') {
            throw "Uninitialized DayPilot.Date (internal error)";
        };
        return this.ticks;
    };
    DayPilot.Date.prototype.getTimePart = function() {
        return DayPilot.Date.getTime(this.d);
    };
    DayPilot.Date.prototype.lastDayOfMonth = function() {
        var $P = DayPilot.Date.lastDayOfMonth(this.getYear(), this.getMonth() + 1);
        return new DayPilot.Date($P);
    };
    DayPilot.Date.prototype.weekNumber = function() {
        var $S = this.firstDayOfYear();
        var $G = (this.getTime() - $S.getTime()) / 86400000;
        return Math.ceil(($G + $S.dayOfWeek() + 1) / 7);
    };
    DayPilot.Date.prototype.weekNumberISO = function() {
        var $T = false;
        var $U = this.dayOfYear();
        var $V = this.firstDayOfYear().dayOfWeek();
        var $W = this.firstDayOfYear().addYears(1).addDays(-1).dayOfWeek();
        if ($V === 0) {
            $V = 7;
        };
        if ($W === 0) {
            $W = 7;
        };
        var $X = 8 - ($V);
        if ($V == 4 || $W == 4) {
            $T = true;
        };
        var $Y = Math.ceil(($U - ($X)) / 7.0);
        var $Z = $Y;
        if ($X >= 4) {
            $Z = $Z + 1;
        };
        if ($Z > 52 && !$T) {
            $Z = 1;
        };
        if ($Z === 0) {
            $Z = this.firstDayOfYear().addDays(-1).weekNumberISO();
        };
        return $Z;
    };
    DayPilot.Date.prototype.toDateLocal = function() {
        return DayPilot.Date.toLocal(this.d);
    };
    DayPilot.Date.prototype.toJSON = function() {
        return this.toStringSortable();
    };
    DayPilot.Date.prototype.toString = function($00, $01) {
        if (typeof $00 === 'undefined') {
            return this.toStringSortable();
        };
        return new $02($00, $01).print(this);
    };
    DayPilot.Date.prototype.toStringSortable = function() {
        return DayPilot.Date.toStringSortable(this.d);
    };
    DayPilot.Date.parse = function(str, $00) {
        var p = new $02($00);
        return p.parse(str);
    };
    DayPilot.Date.fromStringSortable = function($03) {
        var $04 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
        var $E = /^(\d{4})-(\d{2})-(\d{2})$/;
        var $05 = $04.test($03);
        var $06 = $E.test($03);
        var $07 = $05 || $06;
        if (!$07) {
            throw "Invalid string format (use '2010-01-01' or '2010-01-01T00:00:00'.";
        };
        var $08 = $05 ? $04 : $E;
        var m = $08.exec($03);
        var d = new Date();
        d.setUTCFullYear(m[1], m[2] - 1, m[3]);
        d.setUTCHours(m[4] ? m[4] : 0);
        d.setUTCMinutes(m[5] ? m[5] : 0);
        d.setUTCSeconds(m[6] ? m[6] : 0);
        d.setUTCMilliseconds(0);
        return new DayPilot.Date(d);
    };
    DayPilot.Date.addDays = function($E, $G) {
        var d = new Date();
        d.setTime($E.getTime() + $G * 24 * 60 * 60 * 1000);
        return d;
    };
    DayPilot.Date.addMinutes = function($E, $J) {
        var d = new Date();
        d.setTime($E.getTime() + $J * 60 * 1000);
        return d;
    };
    DayPilot.Date.addMonths = function($E, $K) {
        if ($K === 0) return $E;
        var y = $E.getUTCFullYear();
        var m = $E.getUTCMonth() + 1;
        if ($K > 0) {
            while ($K >= 12) {
                $K -= 12;
                y++;
            };
            if ($K > 12 - m) {
                y++;
                m = $K - (12 - m);
            } else {
                m += $K;
            }
        } else {
            while ($K <= -12) {
                $K += 12;
                y--;
            };
            if (m <= $K) {
                y--;
                m = 12 - ($K + m);
            } else {
                m = m + $K;
            }
        };
        var d = DayPilot.Date.clone($E);
        d.setUTCFullYear(y);
        d.setUTCMonth(m - 1);
        return d;
    };
    DayPilot.Date.addTime = function($E, $09) {
        var d = new Date();
        d.setTime($E.getTime() + $09);
        return d;
    };
    DayPilot.Date.clone = function($0a) {
        var d = new Date();
        return DayPilot.Date.dateFromTicks($0a.getTime());
    };
    DayPilot.Date.daysDiff = function($S, $0b) {
        if ($S.getTime() > $0b.getTime()) {
            return null;
        };
        var i = 0;
        var $0c = DayPilot.Date.getDate($S);
        var $0d = DayPilot.Date.getDate($0b);
        while ($0c < $0d) {
            $0c = DayPilot.Date.addDays($0c, 1);
            i++;
        };
        return i;
    };
    DayPilot.Date.daysInMonth = function($Q, $0e) {
        if ($Q.getUTCFullYear) {
            $0e = $Q.getUTCMonth() + 1;
            $Q = $Q.getUTCFullYear();
        };
        var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ($0e != 2) return m[$0e - 1];
        if ($Q % 4 != 0) return m[1];
        if ($Q % 100 == 0 && $Q % 400 != 0) return m[1];
        return m[1] + 1;
    };
    DayPilot.Date.daysSpan = function($S, $0b) {
        if ($S.getTime() === $0b.getTime()) {
            return 0;
        };
        var $0f = DayPilot.Date.daysDiff($S, $0b);
        if (DayPilot.Date.equals($0b, DayPilot.Date.getDate($0b))) {
            $0f--;
        };
        return $0f;
    };
    DayPilot.Date.diff = function($S, $0b) {
        if (!($S && $0b && $S.getTime && $0b.getTime)) {
            throw "Both compared objects must be Date objects (DayPilot.Date.diff).";
        };
        return $S.getTime() - $0b.getTime();
    };
    DayPilot.Date.equals = function($S, $0b) {
        return $S.getTime() === $0b.getTime();
    };
    DayPilot.Date.fromLocal = function($0g) {
        if (!$0g) {
            $0g = new Date();
        };
        var d = new Date();
        d.setUTCFullYear($0g.getFullYear(), $0g.getMonth(), $0g.getDate());
        d.setUTCHours($0g.getHours());
        d.setUTCMinutes($0g.getMinutes());
        d.setUTCSeconds($0g.getSeconds());
        d.setUTCMilliseconds($0g.getMilliseconds());
        return d;
    };
    DayPilot.Date.firstDayOfMonth = function($Q, $0e) {
        var d = new Date();
        d.setUTCFullYear($Q, $0e - 1, 1);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return d;
    };
    DayPilot.Date.firstDayOfWeek = function(d, $R) {
        var $0h = d.getUTCDay();
        while ($0h !== $R) {
            d = DayPilot.Date.addDays(d, -1);
            $0h = d.getUTCDay();
        };
        return d;
    };
    DayPilot.Date.dateFromTicks = function($M) {
        var d = new Date();
        d.setTime($M);
        return d;
    };
    DayPilot.Date.getDate = function($0a) {
        var d = DayPilot.Date.clone($0a);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return d;
    };
    DayPilot.Date.getStart = function($Q, $0e, $R) {
        var $0i = DayPilot.Date.firstDayOfMonth($Q, $0e);
        d = DayPilot.Date.firstDayOfWeek($0i, $R);
        return d;
    };
    DayPilot.Date.getTime = function($0a) {
        var $E = DayPilot.Date.getDate($0a);
        return DayPilot.Date.diff($0a, $E);
    };
    DayPilot.Date.hours = function($E, $0j) {
        var $0k = $E.getUTCMinutes();
        if ($0k < 10) $0k = "0" + $0k;
        var $0l = $E.getUTCHours();
        if ($0j) {
            var am = $0l < 12;
            var $0l = $0l % 12;
            if ($0l == 0) {
                $0l = 12;
            };
            var $0m = am ? "AM3" : "PM3";
            return $0l + ':' + $0k + ' ' + $0m;
        } else {
            return $0l + ':' + $0k;
        }
    };
    DayPilot.Date.lastDayOfMonth = function($Q, $0e) {
        var d = DayPilot.Date.firstDayOfMonth($Q, $0e);
        var length = DayPilot.Date.daysInMonth($Q, $0e);
        d.setUTCDate(length);
        return d;
    };
    DayPilot.Date.max = function($S, $0b) {
        if ($S.getTime() > $0b.getTime()) {
            return $S;
        } else {
            return $0b;
        }
    };
    DayPilot.Date.min = function($S, $0b) {
        if ($S.getTime() < $0b.getTime()) {
            return $S;
        } else {
            return $0b;
        }
    };
    DayPilot.Date.today = function() {
        var $0n = new Date();
        var d = new Date();
        d.setUTCFullYear($0n.getFullYear());
        d.setUTCMonth($0n.getMonth());
        d.setUTCDate($0n.getDate());
        return d;
    };
    DayPilot.Date.toLocal = function($E) {
        if (!$E) {
            $E = new Date();
        };
        var d = new Date();
        d.setFullYear($E.getUTCFullYear(), $E.getUTCMonth(), $E.getUTCDate());
        d.setHours($E.getUTCHours());
        d.setMinutes($E.getUTCMinutes());
        d.setSeconds($E.getUTCSeconds());
        d.setMilliseconds($E.getUTCMilliseconds());
        return d;
    };
    DayPilot.Date.toStringSortable = function($E) {
        if ($E.isDayPilotDate) {
            return $E.toStringSortable();
        };
        var d = $E;
        var $0b = d.getUTCSeconds();
        if ($0b < 10) $0b = "0" + $0b;
        var $0k = d.getUTCMinutes();
        if ($0k < 10) $0k = "0" + $0k;
        var $0l = d.getUTCHours();
        if ($0l < 10) $0l = "0" + $0l;
        var $0h = d.getUTCDate();
        if ($0h < 10) $0h = "0" + $0h;
        var $0e = d.getUTCMonth() + 1;
        if ($0e < 10) $0e = "0" + $0e;
        var $Q = d.getUTCFullYear();
        if ($Q <= 0) {
            throw "The minimum year supported is 1.";
        };
        if ($Q < 10) {
            $Q = "000" + $Q;
        } else if ($Q < 100) {
            $Q = "00" + $Q;
        } else if ($Q < 1000) {
            $Q = "0" + $Q;
        };
        return $Q + "-" + $0e + "-" + $0h + 'T' + $0l + ":" + $0k + ":" + $0b;
    };
    DayPilot.Locale = function(id, $0o) {
        this.id = id;
        this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.dayNamesShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.datePattern = "M/d/yyyy";
        this.timePattern = "H:mm";
        this.dateTimePattern = "M/d/yyyy H:mm";
        this.timeFormat = "Clock12Hours";
        this.weekStarts = 0;
        if ($0o) {
            for (var name in $0o) {
                this[name] = $0o[name];
            }
        }
    };
    DayPilot.Locale.all = {};
    DayPilot.Locale.find = function(id) {
        if (!id) {
            return null;
        };
        var $0p = id.toLowerCase();
        if ($0p.length > 2) {
            $0p[2] = '-';
        };
        return DayPilot.Locale.all[$0p];
    };
    DayPilot.Locale.register = function($01) {
        DayPilot.Locale.all[$01.id] = $01;
    };
    DayPilot.Locale.register(new DayPilot.Locale('de-de', {
        'dayNames': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        'dayNamesShort': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        'monthNames': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-au', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'd/MM/yyyy',
        'dateTimePattern': 'd/MM/yyyy h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-ca', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'yyyy-MM-dd',
        'dateTimePattern': 'yyyy-MM-dd h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-gb', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-us', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'M/d/yyyy',
        'dateTimePattern': 'M/d/yyyy h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('es-es', {
        'dayNames': ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        'dayNamesShort': ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        'monthNames': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('es-mx', {
        'dayNames': ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        'dayNamesShort': ['do.', 'lu.', 'ma.', 'mi.', 'ju.', 'vi.', 'sá.'],
        'monthNames': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', ''],
        'timePattern': 'hh:mm tt',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy hh:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fr-fr', {
        'dayNames': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        'dayNamesShort': ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
        'monthNames': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('it-it', {
        'dayNames': ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
        'dayNamesShort': ['do', 'lu', 'ma', 'me', 'gi', 've', 'sa'],
        'monthNames': ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre', ''],
        'timePattern': 'HH.mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH.mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('ja-jp', {
        'dayNames': ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        'dayNamesShort': ['日', '月', '火', '水', '木', '金', '土'],
        'monthNames': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ''],
        'timePattern': 'H:mm',
        'datePattern': 'yyyy/MM/dd',
        'dateTimePattern': 'yyyy/MM/dd H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('pt-br', {
        'dayNames': ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
        'dayNamesShort': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        'monthNames': ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('ru-ru', {
        'dayNames': ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        'dayNamesShort': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        'monthNames': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('zh-cn', {
        'dayNames': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        'dayNamesShort': ['日', '一', '二', '三', '四', '五', '六'],
        'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ''],
        'timePattern': 'H:mm',
        'datePattern': 'yyyy/M/d',
        'dateTimePattern': 'yyyy/M/d H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('sv-se', {
        'dayNames': ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
        'dayNamesShort': ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö'],
        'monthNames': ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'yyyy-MM-dd',
        'dateTimePattern': 'yyyy-MM-dd HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('da-dk', {
        'dayNames': ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
        'dayNamesShort': ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
        'monthNames': ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd-MM-yyyy',
        'dateTimePattern': 'dd-MM-yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nb-no', {
        'dayNames': ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
        'dayNamesShort': ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
        'monthNames': ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nn-no', {
        'dayNames': ['søndag', 'måndag', 'tysdag', 'onsdag', 'torsdag', 'fredag', 'laurdag'],
        'dayNamesShort': ['sø', 'må', 'ty', 'on', 'to', 'fr', 'la'],
        'monthNames': ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fi-fi', {
        'dayNames': ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
        'dayNamesShort': ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
        'monthNames': ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd.M.yyyy',
        'dateTimePattern': 'd.M.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nl-nl', {
        'dayNames': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
        'dayNamesShort': ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        'monthNames': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'd-M-yyyy',
        'dateTimePattern': 'd-M-yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('cs-cz', {
        'dayNames': ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
        'dayNamesShort': ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
        'monthNames': ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd. M. yyyy',
        'dateTimePattern': 'd. M. yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.US = DayPilot.Locale.find("en-us");
    var $02 = function($00, $01) {
        if (typeof $01 === "string") {
            $01 = DayPilot.Locale.find($01);
        };
        var $01 = $01 || DayPilot.Locale.US;
        var $0q = [{
            "seq": "yyyy",
            "expr": "[0-9]{4,4\u007d",
            "str": function(d) {
                return d.getYear();
            }
        }, {
            "seq": "MMMM",
            "expr": "[a-z]*",
            "str": function(d) {
                var r = $01.monthNames[d.getMonth()];
                return r;
            }
        }, {
            "seq": "MM",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getMonth() + 1;
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "M",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getMonth() + 1;
                return r;
            }
        }, {
            "seq": "dddd",
            "expr": "[a-z]*",
            "str": function(d) {
                var r = $01.dayNames[d.getDayOfWeek()];
                return r;
            }
        }, {
            "seq": "dd",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getDay();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "d",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getDay();
                return r;
            }
        }, {
            "seq": "m",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getMinutes();
                return r;
            }
        }, {
            "seq": "mm",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getMinutes();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "H",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getHours();
                return r;
            }
        }, {
            "seq": "HH",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getHours();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "h",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var $0l = d.getHours();
                var $0l = $0l % 12;
                if ($0l === 0) {
                    $0l = 12;
                };
                return $0l;
            }
        }, {
            "seq": "hh",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var $0l = d.getHours();
                var $0l = $0l % 12;
                if ($0l === 0) {
                    $0l = 12;
                };
                var r = $0l;
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "tt",
            "expr": "(AM|PM)",
            "str": function(d) {
                var $0l = d.getHours();
                var am = $0l < 12;
                return am ? "AM4" : "PM4";
            }
        }, {
            "seq": "s",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getSeconds();
                return r;
            }
        }, {
            "seq": "ss",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getSeconds();
                return r < 10 ? "0" + r : r;
            }
        }];
        var $0r = function($0s) {
            return $0s.replace(/[-[\]{};()*+?.,\\^$|#\s]/g, "\\$&");
        };
        this.init = function() {
            this.year = this.findSequence("yyyy");
            this.month = this.findSequence("MM") || this.findSequence("M");
            this.day = this.findSequence("dd") || this.findSequence("d");
            this.hours = this.findSequence("HH") || this.findSequence("H");
            this.minutes = this.findSequence("mm") || this.findSequence("m");
            this.seconds = this.findSequence("ss") || this.findSequence("s");
        };
        this.findSequence = function($0t) {
            var $n = $00.indexOf($0t);
            if ($n === -1) {
                return null;
            };
            return {
                "findValue": function($0u) {
                    var $0v = $0r($00);
                    for (var i = 0; i < $0q.length; i++) {
                        var $0w = $0q[i].length;
                        var $0x = ($0t === $0q[i].seq);
                        var $0y = $0q[i].expr;
                        if ($0x) {
                            $0y = "(" + $0y + ")";
                        };
                        $0v = $0v.replace($0q[i].seq, $0y);
                    };
                    try {
                        var r = new RegExp($0v);
                        var $o = r.exec($0u);
                        if (!$o) {
                            return null;
                        };
                        return parseInt($o[1]);
                    } catch (e) {
                        throw "unable to create regex from: " + $0v;
                    }
                }
            };
        };
        this.print = function($E) {
            var find = function(t) {
                for (var i = 0; i < $0q.length; i++) {
                    if ($0q[i].seq === t) {
                        return $0q[i];
                    }
                };
                return null;
            };
            var $0z = $00.length <= 0;
            var $0A = 0;
            var $0B = [];
            while (!$0z) {
                var $0C = $00.substring($0A);
                var $0D = /(.)\1*/.exec($0C);
                if ($0D && $0D.length > 0) {
                    var $0E = $0D[0];
                    var q = find($0E);
                    if (q) {
                        $0B.push(q);
                    } else {
                        $0B.push($0E);
                    };
                    $0A += $0E.length;
                    $0z = $00.length <= $0A;
                } else {
                    $0z = true;
                }
            };
            for (var i = 0; i < $0B.length; i++) {
                var c = $0B[i];
                if (typeof c !== 'string') {
                    $0B[i] = c.str($E);
                }
            };
            return $0B.join("");
        };
        this.parse = function($0u) {
            var $Q = this.year.findValue($0u);
            if (!$Q) {
                return null;
            };
            var $0e = this.month.findValue($0u);
            var $0h = this.day.findValue($0u);
            var $H = this.hours ? this.hours.findValue($0u) : 0;
            var $J = this.minutes ? this.minutes.findValue($0u) : 0;
            var $L = this.seconds ? this.seconds.findValue($0u) : 0;
            var d = new Date();
            d.setUTCFullYear($Q, $0e - 1, $0h);
            d.setUTCHours($H);
            d.setUTCMinutes($J);
            d.setUTCSeconds($L);
            d.setUTCMilliseconds(0);
            return new DayPilot.Date(d);
        };
        this.init();
    };
    DayPilot.Event = function($0F, $0G, $0H) {
        this.type = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.data.type;
            } else {
                this.temp().type = $0L;
                this.client.innerHTML($0L);
            }
        };
        this.user = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.data.user;
            } else {
                this.temp().user = $0L;
                this.client.innerHTML($0L);
            }
        };
        var e = this;
        this.calendar = $0G;
        this.data = $0F ? $0F : {};
        this.part = $0H ? $0H : {};
        if (typeof this.data.id === 'undefined') {
            this.data.id = this.data.value;
        };
        var $0I = {};
        var $0J = ["id", "text", "start", "end"];
        this.isEvent = true;
        this.temp = function() {
            if ($0I.dirty) {
                return $0I;
            };
            for (var i = 0; i < $0J.length; i++) {
                $0I[$0J[i]] = e.data[$0J[i]];
            };
            $0I.dirty = true;
            return $0I;
        };
        this.copy = function() {
            var $0K = {};
            for (var i = 0; i < $0J.length; i++) {
                $0K[$0J[i]] = e.data[$0J[i]];
            };
            return $0K;
        };
        this.commit = function() {
            if (!$0I.dirty) {
                return;
            };
            for (var i = 0; i < $0J.length; i++) {
                e.data[$0J[i]] = $0I[$0J[i]];
            };
            $0I.dirty = false;
        };
        this.dirty = function() {
            return $0I.dirty;
        };
        this.id = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.data.id;
            } else {
                this.temp().id = $0L;
            }
        };
        this.value = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.id();
            } else {
                e.id($0L);
            }
        };
        this.text = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.data.text;
            } else {
                this.temp().text = $0L;
                this.client.innerHTML($0L);
            }
        };
        this.start = function($0L) {
            if (typeof $0L === 'undefined') {
                return new DayPilot.Date(e.data.start);
            } else {
                this.temp().start = new DayPilot.Date($0L);
            }
        };
        this.end = function($0L) {
            if (typeof $0L === 'undefined') {
                return new DayPilot.Date(e.data.end);
            } else {
                this.temp().end = new DayPilot.Date($0L);
            }
        };
        this.partStart = function() {
            return new DayPilot.Date(this.part.start);
        };
        this.partEnd = function() {
            return new DayPilot.Date(this.part.end);
        };
        this.tag = function($0M) {
            var $0N = e.data.tag;
            if (!$0N) {
                return null;
            };
            if (typeof $0M === 'undefined') {
                return e.data.tag;
            };
            var $0O = e.calendar.tagFields;
            var $n = -1;
            for (var i = 0; i < $0O.length; i++) {
                if ($0M === $0O[i]) $n = i;
            };
            if ($n === -1) {
                throw "Field name not found.";
            };
            return $0N[$n];
        };
        this.client = {};
        this.client.innerHTML = function($0L) {
            if (typeof $0L === 'undefined') {
                if (e.cache && typeof e.cache.html !== "undefined") {
                    return e.cache.html;
                };
                if (typeof e.data.html !== "undefined") {
                    return e.data.html;
                };
                return e.data.text;
            } else {
                e.data.html = $0L;
            }
        };
        this.client.html = this.client.innerHTML;
        this.client.header = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.data.header;
            } else {
                e.data.header = $0L;
            }
        };
        this.client.cssClass = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.data.cssClass;
            } else {
                e.data.cssClass = $0L;
            }
        };
        this.client.toolTip = function($0L) {
            if (typeof $0L === 'undefined') {
                if (e.cache && typeof e.cache.toolTip !== "undefined") {
                    return e.cache.toolTip;
                };
                return typeof e.data.toolTip !== 'undefined' ? e.data.toolTip : e.data.text;
            } else {
                e.data.toolTip = $0L;
            }
        };
        this.client.backColor = function($0L) {
            if (typeof $0L === 'undefined') {
                if (e.cache && typeof e.cache.backColor !== "undefined") {
                    return e.cache.backColor;
                };
                return typeof e.data.backColor !== "undefined" ? e.data.backColor : e.calendar.eventBackColor;
            } else {
                e.data.backColor = $0L;
            }
        };
        this.client.borderColor = function($0L) {
            if (typeof $0L === 'undefined') {
                if (e.cache && typeof e.cache.borderColor !== "undefined") {
                    return e.cache.borderColor;
                };
                return typeof e.data.borderColor !== "undefined" ? e.data.borderColor : e.calendar.eventBorderColor;
            } else {
                e.data.borderColor = $0L;
            }
        };
        this.client.moveEnabled = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.calendar.eventMoveHandling !== 'Disabled' && !e.data.moveDisabled;
            } else {
                e.data.moveDisabled = !$0L;
            }
        };
        this.client.resizeEnabled = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.calendar.eventResizeHandling !== 'Disabled' && !e.data.resizeDisabled;
            } else {
                e.data.resizeDisabled = !$0L;
            }
        };
        this.client.clickEnabled = function($0L) {
            if (typeof $0L === 'undefined') {
                return e.calendar.eventClickHandling !== 'Disabled' && !e.data.clickDisabled;
            } else {
                e.data.clickDisabled = !$0L;
            }
        };
        this.toJSON = function($v) {
            var $w = {};
            $w.value = this.id();
            $w.id = this.id();
            $w.text = this.text();
            $w.type = this.type();
            $w.user = this.user();
            $w.start = this.start();
            $w.end = this.end();
            $w.tag = {};
            if (e.calendar && e.calendar.tagFields) {
                var $0O = e.calendar.tagFields;
                for (var i = 0; i < $0O.length; i++) {
                    $w.tag[$0O[i]] = this.tag($0O[i]);
                }
            };
            return $w;
        };
    };
})();
DayPilot.JSON = {};
(function() {
    function f(n) {
        return n < 10 ? '0' + n : n;
    };
    if (typeof Date.prototype.toJSON2 !== 'function') {
        Date.prototype.toJSON2 = function($v) {
            return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + '';
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function($v) {
            return this.valueOf();
        };
    };
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        $0P = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        $0Q, $0R, $0S = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        $0T;

    function quote($03) {
        $0P.lastIndex = 0;
        return $0P.test($03) ? '"' + $03.replace($0P, function(a) {
            var c = $0S[a];
            if (typeof c === 'string') {
                return c;
            };
            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + $03 + '"';
    };

    function str($v, $0U) {
        var i, k, v, length, $0V = $0Q,
            $0W, $0X = $0U[$v];
        if ($0X && typeof $0X === 'object' && typeof $0X.toJSON2 === 'function') {
            $0X = $0X.toJSON2($v);
        } else if ($0X && typeof $0X === 'object' && typeof $0X.toJSON === 'function' && !$0X.ignoreToJSON) {
            $0X = $0X.toJSON($v);
        };
        if (typeof $0T === 'function') {
            $0X = $0T.call($0U, $v, $0X);
        };
        switch (typeof $0X) {
            case 'string':
                return quote($0X);
            case 'number':
                return isFinite($0X) ? String($0X) : 'null';
            case 'boolean':
            case 'null':
                return String($0X);
            case 'object':
                if (!$0X) {
                    return 'null';
                };
                $0Q += $0R;
                $0W = [];
                if (typeof $0X.length === 'number' && !$0X.propertyIsEnumerable('length')) {
                    length = $0X.length;
                    for (i = 0; i < length; i += 1) {
                        $0W[i] = str(i, $0X) || 'null';
                    };
                    v = $0W.length === 0 ? '[]' : $0Q ? '[\n' + $0Q + $0W.join(',\n' + $0Q) + '\n' + $0V + ']' : '[' + $0W.join(',') + ']';
                    $0Q = $0V;
                    return v;
                };
                if ($0T && typeof $0T === 'object') {
                    length = $0T.length;
                    for (i = 0; i < length; i += 1) {
                        k = $0T[i];
                        if (typeof k === 'string') {
                            v = str(k, $0X);
                            if (v) {
                                $0W.push(quote(k) + ($0Q ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in $0X) {
                        if (Object.hasOwnProperty.call($0X, k)) {
                            v = str(k, $0X);
                            if (v) {
                                $0W.push(quote(k) + ($0Q ? ': ' : ':') + v);
                            }
                        }
                    }
                };
                v = ($0W.length === 0) ? '{\u007D' : $0Q ? '{\n' + $0Q + $0W.join(',\n' + $0Q) + '\n' + $0V + '\u007D' : '{' + $0W.join(',') + '\u007D';
                $0Q = $0V;
                return v;
        }
    };
    if (typeof DayPilot.JSON.stringify !== 'function') {
        DayPilot.JSON.stringify = function($0X, $0Y, $0Z) {
            var i;
            $0Q = '';
            $0R = '';
            if (typeof $0Z === 'number') {
                for (i = 0; i < $0Z; i += 1) {
                    $0R += ' ';
                }
            } else if (typeof $0Z === 'string') {
                $0R = $0Z;
            };
            $0T = $0Y;
            if ($0Y && typeof $0Y !== 'function' && (typeof $0Y !== 'object' || typeof $0Y.length !== 'number')) {
                throw new Error('JSON.stringify');
            };
            return str('', {
                '': $0X
            });
        };
    }
})();


if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
(function() {
    if (typeof DayPilot.DatePicker !== 'undefined') {
        return;
    };
    DayPilot.DatePicker = function($a) {
        this.v = '126';
        var $b = "navigator_" + new Date().getTime();
        var $c = this;
        this.prepare = function() {
            this.locale = "en-us";
            this.target = null;
            this.resetTarget = true;
            this.pattern = this.$m.locale().datePattern;
            this.cssClassPrefix = "navigator_white";
            this.patterns = [];
            if ($a) {
                for (var name in $a) {
                    this[name] = $a[name];
                }
            };
            this.init();
        };
        this.init = function() {
            this.date = new DayPilot.Date(this.date);
            var $d = this.$n();
            if (this.resetTarget && !$d) {
                this.$o(this.date);
            }
        };
        this.close = function() {
            if (this.navigator) {
                this.navigator.dispose();
            };
            this.div.innerHTML = '';
            if (this.div && this.div.parentNode === document.body) {
                document.body.removeChild(this.div);
            }
        };
        this.$n = function() {
            var element = this.$p();
            if (!element) {
                return this.date;
            };
            var $d = null;
            if (element.tagName === "INPUT") {
                $d = element.value;
            } else {
                $d = element.innerText;
            };
            if (!$d) {
                return null;
            };
            var $e = DayPilot.Date.parse($d, $c.pattern);
            for (var i = 0; i < $c.patterns.length; i++) {
                if ($e) {
                    return $e;
                };
                $e = DayPilot.Date.parse($d, $c.patterns[i]);
            };
            return $e;
        };
        this.$o = function($e) {
            var element = this.$p();
            if (!element) {
                return;
            };
            var $d = $e.toString($c.pattern, $c.locale);
            if (element.tagName === "INPUT") {
                element.value = $d;
            } else {
                element.innerHTML = $d;
            }
        };
        this.$m = {};
        this.$m.locale = function() {
            return DayPilot.Locale.find($c.locale);
        };
        this.$p = function() {
            var id = this.target;
            var element = (id && id.nodeType && id.nodeType === 1) ? id : document.getElementById(id);
            return element;
        };
        this.show = function() {
            var element = this.$p();
            var navigator = this.navigator;
            var navigator = new DayPilot.Navigator($b);
            navigator.api = 2;
            navigator.cssOnly = true;
            navigator.cssClassPrefix = $c.cssClassPrefix;
            navigator.weekStarts = "Auto";
            navigator.locale = $c.locale;
            navigator.timeRangeSelectedHandling = "JavaScript";
            navigator.onTimeRangeSelected = function($f) {
                $c.date = $f.start;
                var $g = $f.start;
                var $d = $g.toString($c.pattern, $c.locale);
                var $f = {};
                $f.start = $g;
                $f.date = $g;
                $f.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeSelect === 'function') {
                    $c.onTimeRangeSelect($f);
                    if ($f.preventDefault.value) {
                        return;
                    }
                };
                $c.$o($d);
                $c.close();
                if (typeof $c.onTimeRangeSelected === 'function') {
                    $c.onTimeRangeSelected($f);
                }
            };
            this.navigator = navigator;
            var $h = DayPilot.abs(element);
            var $i = element.offsetHeight;
            var $j = document.createElement("div");
            $j.style.position = "absolute";
            $j.style.left = $h.x + "px";
            $j.style.top = ($h.y + $i) + "px";
            var $k = document.createElement("div");
            $k.id = $b;
            $j.appendChild($k);
            document.body.appendChild($j);
            this.div = $j;
            var $l = $c.$n() || new DayPilot.Date().getDatePart();
            navigator.startDate = $l;
            navigator.selectionStart = $l;
            navigator.init();
        };
        this.prepare();
    };
})();

if (typeof(DayPilot) === 'undefined') {
    DayPilot = {};
};
(function() {
    DayPilot.ModalStatic = {};
    DayPilot.ModalStatic.list = [];
    DayPilot.ModalStatic.hide = function() {
        if (this.list.length > 0) {
            var $a = this.list.pop();
            if ($a) {
                $a.hide();
            }
        }
    };
    DayPilot.ModalStatic.remove = function($b) {
        var $c = DayPilot.ModalStatic.list;
        for (var i = 0; i < $c.length; i++) {
            if ($c[i] === $b) {
                $c.splice(i, 1);
                return;
            }
        }
    };
    DayPilot.ModalStatic.close = function($d) {
        DayPilot.ModalStatic.result($d);
        DayPilot.ModalStatic.hide();
    };
    DayPilot.ModalStatic.result = function(r) {
        var $c = DayPilot.ModalStatic.list;
        if ($c.length > 0) {
            $c[$c.length - 1].result = r;
        }
    };
    DayPilot.ModalStatic.displayed = function($b) {
        var $c = DayPilot.ModalStatic.list;
        for (var i = 0; i < $c.length; i++) {
            if ($c[i] === $b) {
                return true;
            }
        };
        return false;
    };
    var $e = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
    DayPilot.Modal = function() {
        this.autoStretch = true;
        this.autoStretchFirstLoadOnly = false;
        this.border = "10px solid #ccc";
        this.corners = 'Rounded';
        this.className = null;
        this.dragDrop = true;
        this.height = 200;
        this.maxHeight = null;
        this.opacity = 30;
        this.scrollWithPage = true;
        this.top = 20;
        this.useIframe = true;
        this.width = 500;
        this.zIndex = null;
        this.closed = null;
        var $f = this;
        this.id = '_' + new Date().getTime() + 'n' + (Math.random() * 10);
        this.registered = false;
        this.start = null;
        this.coords = null;
        this.showHtml = function($g) {
            if (DayPilot.ModalStatic.displayed(this)) {
                throw "This modal dialog is already displayed.";
            };
            if (!this.div) {
                this.create();
            };
            this.update();
            if (this.useIframe) {
                var $h = function(p, $i) {
                    return function() {
                        p.setInnerHTML(p.id + "iframe", $i);
                    };
                };
                window.setTimeout($h(this, $g), 0);
            } else {
                this.div.innerHTML = $g;
            };
            this.update();
            this.register();
        };
        this.rounded = function() {
            return this.corners && this.corners.toLowerCase() === 'rounded';
        };
        this.showUrl = function($j) {
            if (DayPilot.ModalStatic.displayed(this)) {
                throw "This modal dialog is already displayed.";
            };
            this.useIframe = true;
            if (!this.div) {
                this.create();
            };
            this.re(this.iframe, "load", this.onIframeLoad);
            this.iframe.src = $j;
            this.update();
            this.register();
        };
        this.update = function() {
            var $k = window;
            var $l = document;
            var scrollY = $k.pageYOffset ? $k.pageYOffset : (($l.documentElement && $l.documentElement.scrollTop) ? $l.documentElement.scrollTop : $l.body.scrollTop);
            var $m = function() {
                return $f.windowRect().y;
            };
            this.hideDiv.style.filter = "alpha(opacity=" + this.opacity + ")";
            this.hideDiv.style.opacity = "0." + this.opacity;
            this.hideDiv.style.backgroundColor = "black";
            if (this.zIndex) {
                this.hideDiv.style.zIndex = this.zIndex;
            };
            this.hideDiv.style.display = '';
            window.setTimeout(function() {
                $f.hideDiv.onclick = function() {
                    $f.hide();
                };
            }, 500);
            this.div.className = this.className;
            this.div.style.border = this.border;
            if (this.rounded()) {
                this.div.style.MozBorderRadius = "5px";
                this.div.style.webkitBorderRadius = "5px";
                this.div.style.borderRadius = "5px";
            };
            this.div.style.marginLeft = '-' + Math.floor(this.width / 2) + "px";
            this.div.style.position = 'absolute';
            this.div.style.top = (scrollY + this.top) + 'px';
            this.div.style.width = this.width + 'px';
            if (this.zIndex) {
                this.div.style.zIndex = this.zIndex;
            };
            if (this.height) {
                this.div.style.height = this.height + 'px';
            };
            if (this.useIframe && this.height) {
                this.iframe.style.height = (this.height) + 'px';
            };
            this.div.style.display = '';
            DayPilot.ModalStatic.list.push(this);
        };
        this.onIframeLoad = function() {
            $f.iframe.contentWindow.modal = $f;
            if ($f.autoStretch) {
                $f.stretch();
            }
        };
        this.stretch = function() {
            var $m = function() {
                return $f.windowRect().y;
            };
            var $n = this.maxHeight || $m() - 2 * this.top;
            for (var h = this.height; h < $n && this.hasScrollbar(); h += 10) {
                this.iframe.style.height = (h) + 'px';
                this.div.style.height = h + 'px';
            };
            if (this.autoStretchFirstLoadOnly) {
                this.ue(this.iframe, "load", this.onIframeLoad);
            }
        };
        this.hasScrollbar = function() {
            var document = this.iframe.contentWindow.document;
            var $o = document.compatMode === 'BackCompat' ? document.body : document.documentElement;
            var $p = $o.scrollHeight > $o.clientHeight;
            var $q = $o.scrollWidth > $o.clientWidth;
            return $p;
        };
        this.windowRect = function() {
            var $l = document;
            if ($l.compatMode === "CSS1Compat" && $l.documentElement && $l.documentElement.clientWidth) {
                var x = $l.documentElement.clientWidth;
                var y = $l.documentElement.clientHeight;
                return {
                    x: x,
                    y: y
                };
            } else {
                var x = $l.body.clientWidth;
                var y = $l.body.clientHeight;
                return {
                    x: x,
                    y: y
                };
            }
        };
        this.register = function() {
            if (this.registered) {
                return;
            };
            this.re(window, 'resize', this.resize);
            this.re(window, 'scroll', this.resize);
            if (this.dragDrop) {
                this.re(document, 'mousemove', this.drag);
                this.re(document, 'mouseup', this.drop);
            };
            this.registered = true;
        };
        this.drag = function(e) {
            if (!$f.coords) {
                return;
            };
            var e = e || window.event;
            var $r = $f.mc(e);
            var x = $r.x - $f.coords.x;
            var y = $r.y - $f.coords.y;
            $f.div.style.marginLeft = '0px';
            $f.div.style.top = ($f.start.y + y) + "px";
            $f.div.style.left = ($f.start.x + x) + "px";
        };
        this.drop = function(e) {
            if (!$f.coords) {
                return;
            };
            $f.unmaskIframe();
            $f.coords = null;
        };
        this.maskIframe = function() {
            if (!this.useIframe) {
                return;
            };
            var $s = 80;
            var $t = document.createElement("div");
            $t.style.backgroundColor = "#ffffff";
            $t.style.filter = "alpha(opacity=" + $s + ")";
            $t.style.opacity = "0." + $s;
            $t.style.width = "100%";
            $t.style.height = this.height + "px";
            $t.style.position = "absolute";
            $t.style.left = '0px';
            $t.style.top = '0px';
            this.div.appendChild($t);
            this.mask = $t;
        };
        this.unmaskIframe = function() {
            if (!this.useIframe) {
                return;
            };
            this.div.removeChild(this.mask);
            this.mask = null;
        };
        this.resize = function() {
            if (!$f.hideDiv) {
                return;
            };
            if (!$f.div) {
                return;
            };
            if ($f.hideDiv.style.display === 'none') {
                return;
            };
            if ($f.div.style.display === 'none') {
                return;
            };
            var scrollY = window.pageYOffset ? window.pageYOffset : ((document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop);
            if (!$f.scrollWithPage) {
                $f.div.style.top = (scrollY + $f.top) + 'px';
            }
        };
        this.re = function(el, ev, $u) {
            if (el.addEventListener) {
                el.addEventListener(ev, $u, false);
            } else if (el.attachEvent) {
                el.attachEvent("on" + ev, $u);
            }
        };
        this.ue = function(el, ev, $u) {
            if (el.removeEventListener) {
                el.removeEventListener(ev, $u, false);
            } else if (el.detachEvent) {
                el.detachEvent("on" + ev, $u);
            }
        };
        this.mc = function(ev) {
            if (ev.pageX || ev.pageY) {
                return {
                    x: ev.pageX,
                    y: ev.pageY
                };
            };
            return {
                x: ev.clientX + document.documentElement.scrollLeft,
                y: ev.clientY + document.documentElement.scrollTop
            };
        };
        this.abs = function(element) {
            var r = {
                x: element.offsetLeft,
                y: element.offsetTop
            };
            while (element.offsetParent) {
                element = element.offsetParent;
                r.x += element.offsetLeft;
                r.y += element.offsetTop;
            };
            return r;
        };
        this.create = function() {
            var $v = document.createElement("div");
            $v.id = this.id + "hide";
            $v.style.position = 'fixed';
            $v.style.left = "0px";
            $v.style.top = "0px";
            $v.style.right = "0px";
            $v.style.bottom = "0px";
            $v.style.backgroundColor = "black";
            $v.style.opacity = 0.50;
            $v.oncontextmenu = function() {
                return false;
            };
            document.body.appendChild($v);
            var $w = document.createElement("div");
            $w.id = this.id + 'popup';
            $w.style.position = 'fixed';
            $w.style.left = '50%';
            $w.style.top = '0px';
            $w.style.backgroundColor = 'white';
            $w.style.width = "50px";
            $w.style.height = "50px";
            if (this.dragDrop) {
                $w.onmousedown = this.dragStart;
            };
            var $x = 50;
            var $y = null;
            if (this.useIframe) {
                $y = document.createElement("iframe");
                $y.id = this.id + "iframe";
                $y.name = this.id + "iframe";
                $y.frameBorder = '0';
                $y.style.width = '100%';
                $y.style.height = $x + 'px';
                $w.appendChild($y);
            };
            document.body.appendChild($w);
            this.div = $w;
            this.iframe = $y;
            this.hideDiv = $v;
        };
        this.dragStart = function(e) {
            $f.maskIframe();
            $f.coords = $f.mc(e || window.event);
            $f.start = {
                x: $f.div.offsetLeft,
                y: $f.div.offsetTop
            };
        };
        this.setInnerHTML = function(id, $i) {
            var $z = window.frames[id];
            var $l = $z.contentWindow || $z.document || $z.contentDocument;
            if ($l.document) {
                $l = $l.document;
            };
            $l.body.innerHTML = $i;
        };
        this.close = function($d) {
            this.result = $d;
            this.hide();
        };
        this.hide = function() {
            if (this.div) {
                this.div.style.display = 'none';
                this.hideDiv.style.display = 'none';
                if (!this.useIframe) {
                    this.div.innerHTML = null;
                }
            };
            DayPilot.ModalStatic.remove(this);
            if (this.closed) {
                this.closed();
            }
        };
    };
})();


if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    var $a = function() {};
    if (typeof DayPilot.Month !== 'undefined') {
        return;
    };

    function loadDefaultCss() {
        if (DayPilot.Global.defaultMonthCss) {
            return;
        };
        var $b = DayPilot.sheet();
        $b.add(".month_default_main", "border: 1px solid #aaa;font-family: Tahoma, Arial, sans-serif; font-size: 12px;color: #666;");
        $b.add(".month_default_cell_inner", "border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;background-color: #f9f9f9;");
        $b.add(".month_default_cell_business .month_default_cell_inner", "background-color: #fff;");
        $b.add(".month_default_cell_header", "text-align: right;padding-right: 2px;");
        $b.add(".month_default_header_inner", 'text-align: center; vertical-align: middle;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;cursor: default;color: #666;background: #eee;');
        $b.add(".month_default_message", 'padding: 10px;opacity: 0.9;filter: alpha(opacity=90);color: #ffffff;background: #ffa216;background: -webkit-gradient(linear, left top, left bottom, from(#ffa216), to(#ff8400));background: -webkit-linear-gradient(top, #ffa216 0%, #ff8400);background: -moz-linear-gradient(top, #ffa216 0%, #ff8400);background: -ms-linear-gradient(top, #ffa216 0%, #ff8400);background: -o-linear-gradient(top, #ffa216 0%, #ff8400);background: linear-gradient(top, #ffa216 0%, #ff8400);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffa216", endColorStr="#ff8400");');
        $b.add(".month_default_event_inner", 'position: absolute;top: 0px;bottom: 0px;left: 1px;right: 1px;overflow:hidden;padding: 2px;padding-left: 5px;font-size: 12px;color: #666;background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");border: 1px solid #999;border-radius: 0px;');
        $b.add(".month_default_event_continueright .month_default_event_inner", "border-top-right-radius: 0px;border-bottom-right-radius: 0px;border-right-style: dotted;");
        $b.add(".month_default_event_continueleft .month_default_event_inner", "border-top-left-radius: 0px;border-bottom-left-radius: 0px;border-left-style: dotted;");
        $b.add(".month_default_event_hover .month_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#e8e8e8));background: -webkit-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -moz-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -ms-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -o-linear-gradient(top, #ffffff 0%, #e8e8e8);background: linear-gradient(top, #ffffff 0%, #e8e8e8);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#e8e8e8");');
        $b.add(".month_default_selected .month_default_event_inner, .month_default_event_hover.month_default_selected .month_default_event_inner", "background: #ddd;");
        $b.add(".month_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;");
        $b.commit();
        DayPilot.Global.defaultMonthCss = true;
    };
    var DayPilotMonth = {};
    DayPilotMonth.Month = function($c) {
        this.v = '126';
        this.nav = {};
        this.nav.top = document.getElementById($c);
        var $d = this;
        this.id = $c;
        this.isMonth = true;
        this.hideUntilInit = true;
        this.api = 2;
        this.cssOnly = true;
        this.cssClassPrefix = "month_default";
        this.startDate = new DayPilot.Date();
        this.width = '100%';
        this.cellHeight = 100;
        this.eventFontColor = "#000000";
        this.eventFontFamily = "Tahoma";
        this.eventFontSize = "11px";
        this.headerBackColor = '#F3F3F9';
        this.headerFontColor = '#42658C';
        this.headerFontFamily = "Tahoma";
        this.headerFontSize = "10pt";
        this.headerHeight = 20;
        this.weekStarts = 1;
        this.innerBorderColor = '#cccccc';
        this.borderColor = '#CED2CE';
        this.eventHeight = 25;
        this.cellHeaderHeight = 16;
        this.afterRender = function() {};
        this.backColor = '#ffffff';
        this.nonBusinessBackColor = '#ffffff';
        this.cellHeaderBackColor = '#ffffff';
        this.cellHeaderFontColor = '#42658C';
        this.cellHeaderFontFamily = 'Tahoma';
        this.cellHeaderFontSize = '10pt';
        this.eventBackColor = '#2951A5';
        this.eventBorderColor = '#2951A5';
        this.eventFontColor = '#ffffff';
        this.eventFontFamily = 'Tahoma';
        this.eventFontSize = '11px';
        this.cellWidth = 14.285;
        this.lineSpace = 1;
        this.eventTimeFontColor = 'gray';
        this.eventTimeFontFamily = 'Tahoma';
        this.eventTimeFontSize = '8pt';
        this.eventClickHandling = 'Enabled';
        this.eventMoveHandling = 'Update';
        this.eventResizeHandling = 'Update';
        this.timeRangeSelectedHandling = 'Enabled';
        this.backendUrl = null;
        this.cellEvents = [];
        this.elements = {};
        this.elements.events = [];
        this.cache = {};
        this.updateView = function($e, $f) {
            var $e = eval("(" + $e + ")");
            if ($e.CallBackRedirect) {
                document.location.href = $e.CallBackRedirect;
                return;
            };
            if ($e.UpdateType === "None") {
                $d.fireAfterRenderDetached($e.CallBackData, true);
                return;
            };
            $d.events = $e.Events;
            if ($e.UpdateType === "Full") {
                $d.startDate = $e.StartDate;
                $d.headerBackColor = $e.HeaderBackColor ? $e.HeaderBackColor : $d.headerBackColor;
                $d.backColor = $e.BackColor ? $e.BackColor : $d.backColor;
                $d.nonBusinessBackColor = $e.NonBusinessBackColor ? $e.NonBusinessBackColor : $d.nonBusinessBackColor;
                $d.timeFormat = $e.TimeFormat ? $e.TimeFormat : $d.timeFormat;
                if (typeof $e.WeekStarts !== 'undefined') {
                    $d.weekStarts = $e.WeekStarts;
                };
                $d.hashes = $e.Hashes;
            };
            $d.$0P();
            $d.$0Q();
            $d.$0R();
            if ($e.UpdateType === "Full") {
                $d.$0S();
                $d.$0T();
            };
            $d.updateHeight();
            $d.show();
            $d.$0U();
            $d.fireAfterRenderDetached($e.CallBackData, true);
        };
        this.fireAfterRenderDetached = function($g, $h) {
            var $i = function($g, $j) {
                return function() {
                    if ($d.afterRender) {
                        $d.afterRender($g, $j);
                    }
                };
            };
            window.setTimeout($i($g, $h), 0);
        };
        this.lineHeight = function() {
            return this.eventHeight + this.lineSpace;
        };
        this.events = {};
        this.events.list = [];
        this.events.add = function(e) {
            e.calendar = $d;
            if (!$d.events.list) {
                $d.events.list = [];
            };
            $d.events.list.push(e.data);
            $d.update();
        };
        this.events.update = function(e) {
            e.commit();
            $d.update();
        };
        this.events.remove = function(e) {
            var $k = DayPilot.indexOf($d.events.list, e.data);
            $d.events.list.splice($k, 1);
            $d.update();
        };
        this.update = function() {
            if (!this.cells) {
                return;
            };
            var $l = true;
            $d.$0P();
            $d.$0Q();
            $d.$0R();
            if ($l) {
                $d.$0S();
                $d.$0T();
            };
            $d.updateHeight();
            $d.show();
            $d.$0U();
        };
        this.$0R = function() {
            var $m = this.events.list;
            for (var x = 0; x < $m.length; x++) {
                var e = new DayPilot.Event($m[x], this);
                if (e.start().getTime() > e.end().getTime()) {
                    continue;
                };
                for (var i = 0; i < this.rows.length; i++) {
                    var $n = this.rows[i];
                    if ($n.belongsHere(e)) {
                        $n.events.push(e);
                    }
                }
            };
            for (var ri = 0; ri < this.rows.length; ri++) {
                var $n = this.rows[ri];
                $n.events.sort(this.eventComparer);
                for (var ei = 0; ei < this.rows[ri].events.length; ei++) {
                    var ev = $n.events[ei];
                    var $o = $n.getStartColumn(ev);
                    var $p = $n.getWidth(ev);
                    var $q = $n.putIntoLine(ev, $o, $p, ri);
                }
            }
        };
        this.$0P = function() {
            for (var i = 0; i < this.elements.events.length; i++) {
                var e = this.elements.events[i];
                e.event = null;
                e.click = null;
                e.parentNode.removeChild(e);
            };
            this.elements.events = [];
        };
        this.$0U = function() {
            this.$0V();
        };
        this.$0V = function() {
            this.elements.events = [];
            for (var ri = 0; ri < this.rows.length; ri++) {
                var $n = this.rows[ri];
                for (var li = 0; li < $n.lines.length; li++) {
                    var $q = $n.lines[li];
                    for (var pi = 0; pi < $q.length; pi++) {
                        this.drawEvent($q[pi]);
                    }
                }
            }
        };
        this.eventComparer = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0;
            };
            var $r = a.start().getTime() - b.start().getTime();
            if ($r !== 0) {
                return $r;
            };
            var $s = b.end().getTime() - a.end().getTime();
            return $s;
        };
        this.drawShadow = function(x, y, $q, $t, $u, e) {
            if (!$u) {
                $u = 0;
            };
            var $v = $t;
            this.shadow = {};
            this.shadow.list = [];
            this.shadow.start = {
                x: x,
                y: y
            };
            this.shadow.width = $t;
            var $w = y * 7 + x - $u;
            if ($w < 0) {
                $v += $w;
                x = 0;
                y = 0;
            };
            var $x = $u;
            while ($x >= 7) {
                y--;
                $x -= 7;
            };
            if ($x > x) {
                var $y = 7 - this.getColCount();
                if ($x > (x + $y)) {
                    y--;
                    x = x + 7 - $x;
                } else {
                    $v = $v - $x + x;
                    x = 0;
                }
            } else {
                x -= $x;
            };
            if (y < 0) {
                y = 0;
                x = 0;
            };
            var $z = null;
            if (DayPilotMonth.resizingEvent) {
                $z = 'w-resize';
            } else if (DayPilotMonth.movingEvent) {
                $z = "move";
            };
            this.nav.top.style.cursor = $z;
            while ($v > 0 && y < this.rows.length) {
                var $A = Math.min(this.getColCount() - x, $v);
                var $n = this.rows[y];
                var top = this.getRowTop(y);
                var $B = $n.getHeight();
                var $C = document.createElement("div");
                $C.setAttribute("unselectable", "on");
                $C.style.position = 'absolute';
                $C.style.left = (this.getCellWidth() * x) + '%';
                $C.style.width = (this.getCellWidth() * $A) + '%';
                $C.style.top = (top) + 'px';
                $C.style.height = ($B) + 'px';
                $C.style.cursor = $z;
                var $D = document.createElement("div");
                $D.setAttribute("unselectable", "on");
                $C.appendChild($D);
                $D.style.position = "absolute";
                $D.style.top = "0px";
                $D.style.right = "0px";
                $D.style.left = "0px";
                $D.style.bottom = "0px";
                $D.style.backgroundColor = "#aaaaaa";
                $D.style.opacity = 0.5;
                $D.style.filter = "alpha(opacity=50)";
                if (e) {
                    $D.style.overflow = 'hidden';
                    $D.style.fontSize = this.eventFontSize;
                    $D.style.fontFamily = this.eventFontFamily;
                    $D.style.color = this.eventFontColor;
                    $D.innerHTML = e.client.html();
                };
                this.nav.top.appendChild($C);
                this.shadow.list.push($C);
                $v -= ($A + 7 - this.getColCount());
                x = 0;
                y++;
            }
        };
        this.clearShadow = function() {
            if (this.shadow) {
                for (var i = 0; i < this.shadow.list.length; i++) {
                    this.nav.top.removeChild(this.shadow.list[i]);
                };
                this.shadow = null;
                this.nav.top.style.cursor = '';
            }
        };
        this.getEventTop = function($n, $q) {
            var top = this.headerHeight;
            for (var i = 0; i < $n; i++) {
                top += this.rows[i].getHeight();
            };
            top += this.cellHeaderHeight;
            top += $q * this.lineHeight();
            return top;
        };
        this.getDateFromCell = function(x, y) {
            return DayPilot.Date.addDays(this.firstDate, y * 7 + x);
        };
        this.drawEvent = function(ep) {
            var $n = ep.part.row;
            var $q = ep.part.line;
            var $o = ep.part.colStart;
            var $p = ep.part.colWidth;
            var $E = this.getCellWidth() * ($o);
            var $t = this.getCellWidth() * ($p);
            var top = this.getEventTop($n, $q);
            var e = document.createElement("div");
            e.setAttribute("unselectable", "on");
            e.style.height = this.eventHeight + 'px';
            if (this.cssOnly) {
                e.className = this.$0W("_event");
            } else {
                e.style.fontFamily = this.eventFontFamily;
            };
            e.event = ep;
            e.style.width = $t + '%';
            e.style.position = 'absolute';
            e.style.left = $E + '%';
            e.style.top = top + 'px';
            if (this.showToolTip && ep.client.toolTip()) {
                e.title = ep.client.toolTip();
            };
            e.onclick = $d.eventClickDispatch;
            e.onmousedown = function(ev) {
                ev = ev || window.event;
                var $F = ev.which || ev.button;
                ev.cancelBubble = true;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                };
                if ($F === 1) {
                    DayPilotMonth.movingEvent = null;
                    if (this.style.cursor === 'w-resize' || this.style.cursor === 'e-resize') {
                        var $G = {};
                        $G.start = {};
                        $G.start.x = $o;
                        $G.start.y = $n;
                        $G.event = e.event;
                        $G.width = DayPilot.Date.daysSpan($G.event.start().d, $G.event.end().d) + 1;
                        $G.direction = this.style.cursor;
                        DayPilotMonth.resizingEvent = $G;
                    } else if (this.style.cursor === 'move' || $d.eventMoveHandling !== 'Disabled') {
                        $d.clearShadow();
                        var $H = DayPilot.mo2($d.nav.top, ev);
                        if (!$H) {
                            return;
                        };
                        var $I = $d.getCellBelowPoint($H.x, $H.y);
                        var $w = DayPilot.Date.daysDiff(ep.start(), $d.rows[$n].start);
                        var $u = ($I.y * 7 + $I.x) - ($n * 7 + $o);
                        if ($w) {
                            $u += $w;
                        };
                        var $J = {};
                        $J.start = {};
                        $J.start.x = $o;
                        $J.start.y = $n;
                        $J.start.line = $q;
                        $J.offset = $d.eventMoveToPosition ? 0 : $u;
                        $J.colWidth = $p;
                        $J.event = e.event;
                        $J.coords = $H;
                        DayPilotMonth.movingEvent = $J;
                    }
                }
            };
            e.onmousemove = function(ev) {
                if (typeof(DayPilotMonth) === 'undefined') {
                    return;
                };
                if (DayPilotMonth.movingEvent || DayPilotMonth.resizingEvent) {
                    return;
                };
                var $u = DayPilot.mo3(e, ev);
                if (!$u) {
                    return;
                };
                var $K = 6;
                if ($u.x <= $K && $d.eventResizeHandling !== 'Disabled') {
                    if (ep.part.startsHere) {
                        e.style.cursor = "w-resize";
                        e.dpBorder = 'left';
                    } else {
                        e.style.cursor = 'not-allowed';
                    }
                } else if (e.clientWidth - $u.x <= $K && $d.eventResizeHandling !== 'Disabled') {
                    if (ep.part.endsHere) {
                        e.style.cursor = "e-resize";
                        e.dpBorder = 'right';
                    } else {
                        e.style.cursor = 'not-allowed';
                    }
                } else {
                    e.style.cursor = 'default';
                }
            };
            e.onmouseout = function(ev) {
                e.style.cursor = '';
            };
            var $L = document.createElement("div");
            $L.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                $L.className = this.$0W("_event_inner");
                $L.innerHTML = ep.client.html();
            } else {
                var back = (ep.data.backColor) ? ep.data.backColor : this.eventBackColor;
                $L.style.height = (this.eventHeight - 2) + 'px';
                $L.style.overflow = 'hidden';
                $L.style.position = "absolute";
                $L.style.left = "2px";
                $L.style.right = "2px";
                $L.style.paddingLeft = '2px';
                $L.style.border = '1px solid ' + $d.eventBorderColor;
                $L.style.backgroundColor = back;
                $L.style.fontFamily = "";
                $L.style.MozBorderRadius = "5px";
                $L.style.webkitBorderRadius = "5px";
                $L.style.borderRadius = "5px";
                var $D = [];
                $D.push("<div unselectable='on' style='");
                $D.push("font-size:");
                $D.push(this.eventFontSize);
                $D.push(";color:");
                $D.push(this.eventFontColor);
                $D.push(";font-family:");
                $D.push(this.eventFontFamily);
                $D.push(";'>");
                $D.push(ep.client.html());
                $D.push("</div>");
                $L.innerHTML = $D.join('');
            };
            e.appendChild($L);
            this.elements.events.push(e);
            this.nav.events.appendChild(e);
        };
        this.lastVisibleDayOfMonth = function() {
            return this.startDate.lastDayOfMonth();
        };
        this.$0Q = function() {
            if (typeof this.startDate === 'string') {
                this.startDate = DayPilot.Date.fromStringSortable(this.startDate);
            };
            this.startDate = this.startDate.firstDayOfMonth();
            this.firstDate = this.startDate.firstDayOfWeek(this.getWeekStart());
            var $M = this.startDate;
            var $N;
            var $O = this.lastVisibleDayOfMonth().d;
            var $P = DayPilot.Date.daysDiff(this.firstDate, $O) + 1;
            $N = Math.ceil($P / 7);
            this.days = $N * 7;
            this.rows = [];
            for (var x = 0; x < $N; x++) {
                var r = {};
                r.start = DayPilot.Date.addDays(this.firstDate, x * 7);
                r.end = DayPilot.Date.addDays(r.start, this.getColCount());
                r.events = [];
                r.lines = [];
                r.index = x;
                r.minHeight = this.cellHeight;
                r.calendar = this;
                r.belongsHere = function(ev) {
                    if (ev.end().getTime() === ev.start().getTime() && ev.start().getTime() === this.start.getTime()) {
                        return true;
                    };
                    return !(ev.end().getTime() <= this.start.getTime() || ev.start().getTime() >= this.end.getTime());
                };
                r.getPartStart = function(ev) {
                    return DayPilot.Date.max(this.start, ev.start());
                };
                r.getPartEnd = function(ev) {
                    return DayPilot.Date.min(this.end, ev.end());
                };
                r.getStartColumn = function(ev) {
                    var $Q = this.getPartStart(ev);
                    return DayPilot.Date.daysDiff(this.start, $Q);
                };
                r.getWidth = function(ev) {
                    return DayPilot.Date.daysSpan(this.getPartStart(ev), this.getPartEnd(ev)) + 1;
                };
                r.putIntoLine = function(ev, $o, $p, $n) {
                    var $R = this;
                    for (var i = 0; i < this.lines.length; i++) {
                        var $q = this.lines[i];
                        if ($q.isFree($o, $p)) {
                            $q.addEvent(ev, $o, $p, $n, i);
                            return i;
                        }
                    };
                    var $q = [];
                    $q.isFree = function($o, $p) {
                        var $S = true;
                        for (var i = 0; i < this.length; i++) {
                            if (!($o + $p - 1 < this[i].part.colStart || $o > this[i].part.colStart + this[i].part.colWidth - 1)) {
                                $S = false;
                            }
                        };
                        return $S;
                    };
                    $q.addEvent = function(ep, $o, $p, $n, $k) {
                        ep.part.colStart = $o;
                        ep.part.colWidth = $p;
                        ep.part.row = $n;
                        ep.part.line = $k;
                        ep.part.startsHere = $R.start.getTime() <= ep.start().getTime();
                        ep.part.endsHere = $R.end.getTime() >= ep.end().getTime();
                        this.push(ep);
                    };
                    $q.addEvent(ev, $o, $p, $n, this.lines.length);
                    this.lines.push($q);
                    return this.lines.length - 1;
                };
                r.getStart = function() {
                    var $T = 0;
                    for (var i = 0; i < $d.rows.length && i < this.index; i++) {
                        $T += $d.rows[i].getHeight();
                    }
                };
                r.getHeight = function() {
                    return Math.max(this.lines.length * $d.lineHeight() + $d.cellHeaderHeight, this.calendar.cellHeight);
                };
                this.rows.push(r);
            };
            this.endDate = DayPilot.Date.addDays(this.firstDate, $N * 7);
        };
        this.getHeight = function() {
            var $B = this.headerHeight;
            for (var i = 0; i < this.rows.length; i++) {
                $B += this.rows[i].getHeight();
            };
            return $B;
        };
        this.getWidth = function($T, end) {
            var $U = (end.y * 7 + end.x) - ($T.y * 7 + $T.x);
            return $U + 1;
        };
        this.getMinCoords = function($V, $W) {
            if (($V.y * 7 + $V.x) < ($W.y * 7 + $W.x)) {
                return $V;
            } else {
                return $W;
            }
        };
        this.$0W = function($X) {
            var $Y = this.theme || this.cssClassPrefix;
            if ($Y) {
                return $Y + $X;
            } else {
                return "";
            }
        };
        this.drawTop = function() {
            var $Z = this.nav.top;
            $Z.setAttribute("unselectable", "on");
            $Z.style.MozUserSelect = 'none';
            $Z.style.KhtmlUserSelect = 'none';
            $Z.style.WebkitUserSelect = 'none';
            $Z.style.position = 'relative';
            if (this.width) {
                $Z.style.width = this.width;
            };
            $Z.style.height = this.getHeight() + 'px';
            $Z.onselectstart = function(e) {
                return false;
            };
            if (this.hideUntilInit) {
                $Z.style.visibility = 'hidden';
            };
            if (this.cssOnly) {
                $Z.className = this.$0W("_main");
            } else {
                $Z.style.border = "1px solid " + this.borderColor;
            };
            var $00 = document.createElement("div");
            this.nav.cells = $00;
            $00.style.position = "absolute";
            $00.style.left = "0px";
            $00.style.right = "0px";
            $00.setAttribute("unselectable", "on");
            $Z.appendChild($00);
            var $m = document.createElement("div");
            this.nav.events = $m;
            $m.style.position = "absolute";
            $m.style.left = "0px";
            $m.style.right = "0px";
            $m.setAttribute("unselectable", "on");
            $Z.appendChild($m);
            $Z.onmousemove = function(ev) {
                if (DayPilotMonth.resizingEvent) {
                    var $H = DayPilot.mo2($d.nav.top, ev);
                    if (!$H) {
                        return;
                    };
                    var $I = $d.getCellBelowPoint($H.x, $H.y);
                    $d.clearShadow();
                    var $G = DayPilotMonth.resizingEvent;
                    var $01 = $G.start;
                    var $t, $T;
                    if ($G.direction === 'w-resize') {
                        $T = $I;
                        var $02 = $G.event.end().d;
                        if (DayPilot.Date.getDate($02).getTime() === $02.getTime()) {
                            $02 = DayPilot.Date.addDays($02, -1);
                        };
                        var end = $d.getCellFromDate($02);
                        $t = $d.getWidth($I, end);
                    } else {
                        $T = $d.getCellFromDate($G.event.start().d);
                        $t = $d.getWidth($T, $I);
                    };
                    if ($t < 1) {
                        $t = 1;
                    };
                    $d.drawShadow($T.x, $T.y, 0, $t);
                } else if (DayPilotMonth.movingEvent) {
                    var $H = DayPilot.mo2($d.nav.top, ev);
                    if (!$H) {
                        return;
                    };
                    if ($H.x === DayPilotMonth.movingEvent.coords.x && $H.y === DayPilotMonth.movingEvent.coords.y) {
                        return;
                    };
                    var $I = $d.getCellBelowPoint($H.x, $H.y);
                    $d.clearShadow();
                    var event = DayPilotMonth.movingEvent.event;
                    var $u = DayPilotMonth.movingEvent.offset;
                    var $t = $d.cellMode ? 1 : DayPilot.Date.daysSpan(event.start().d, event.end().d) + 1;
                    if ($t < 1) {
                        $t = 1;
                    };
                    $d.drawShadow($I.x, $I.y, 0, $t, $u, event);
                } else if (DayPilotMonth.timeRangeSelecting) {
                    var $H = DayPilot.mo2($d.nav.top, ev);
                    if (!$H) {
                        return;
                    };
                    var $I = $d.getCellBelowPoint($H.x, $H.y);
                    $d.clearShadow();
                    var $T = DayPilotMonth.timeRangeSelecting;
                    var $03 = $T.y * 7 + $T.x;
                    var $04 = $I.y * 7 + $I.x;
                    var $t = Math.abs($04 - $03) + 1;
                    if ($t < 1) {
                        $t = 1;
                    };
                    var $05 = $03 < $04 ? $T : $I;
                    DayPilotMonth.timeRangeSelecting.from = {
                        x: $05.x,
                        y: $05.y
                    };
                    DayPilotMonth.timeRangeSelecting.width = $t;
                    DayPilotMonth.timeRangeSelecting.moved = true;
                    $d.drawShadow($05.x, $05.y, 0, $t, 0, null);
                }
            };
        };
        this.updateHeight = function() {
            this.nav.top.style.height = this.getHeight() + 'px';
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].style.top = this.getRowTop(y) + 'px';
                    this.cells[x][y].style.height = this.rows[y].getHeight() + 'px';
                }
            }
        };
        this.getCellBelowPoint = function(x, y) {
            var $06 = Math.floor(this.nav.top.clientWidth / this.getColCount());
            var $07 = Math.min(Math.floor(x / $06), this.getColCount() - 1);
            var $n = null;
            var $B = this.headerHeight;
            var $08 = 0;
            for (var i = 0; i < this.rows.length; i++) {
                var $09 = $B;
                $B += this.rows[i].getHeight();
                if (y < $B) {
                    $08 = y - $09;
                    $n = i;
                    break;
                }
            };
            if ($n === null) {
                $n = this.rows.length - 1;
            };
            var $I = {};
            $I.x = $07;
            $I.y = $n;
            $I.relativeY = $08;
            return $I;
        };
        this.getCellFromDate = function($0a) {
            var $t = DayPilot.Date.daysDiff(this.firstDate, $0a);
            var $I = {
                x: 0,
                y: 0
            };
            while ($t >= 7) {
                $I.y++;
                $t -= 7;
            };
            $I.x = $t;
            return $I;
        };
        this.$0T = function() {
            var $0b = document.createElement("div");
            $0b.oncontextmenu = function() {
                return false;
            };
            this.nav.cells.appendChild($0b);
            this.cells = [];
            for (var x = 0; x < this.getColCount(); x++) {
                this.cells[x] = [];
                var $0c = null;
                var $0d = document.createElement("div");
                $0d.setAttribute("unselectable", "on");
                $0d.style.position = 'absolute';
                $0d.style.left = (this.getCellWidth() * x) + '%';
                $0d.style.width = (this.getCellWidth()) + '%';
                $0d.style.top = '0px';
                $0d.style.height = (this.headerHeight) + 'px';
                var $0e = x + this.getWeekStart();
                if ($0e > 6) {
                    $0e -= 7;
                };
                if (this.cssOnly) {
                    $0d.className = this.$0W("_header");
                };
                var $L = document.createElement("div");
                $L.setAttribute("unselectable", "on");
                $L.innerHTML = $0f.locale().dayNames[$0e];
                $0d.appendChild($L);
                $L.style.position = "absolute";
                $L.style.top = "0px";
                $L.style.bottom = "0px";
                $L.style.left = "0px";
                $L.style.right = "0px";
                if (this.cssOnly) {
                    $L.className = this.$0W("_header_inner");
                } else {
                    $L.style.backgroundColor = this.headerBackColor;
                    $L.style.fontFamily = this.headerFontFamily;
                    $L.style.fontSize = this.headerFontSize;
                    $L.style.color = this.headerFontColor;
                    $L.style.textAlign = 'center';
                    $L.style.cursor = 'default';
                    if (x !== this.getColCount() - 1) {
                        $L.style.borderRight = '1px solid ' + this.borderColor;
                    }
                };
                $L.innerHTML = $0f.locale().dayNames[$0e];
                $0b.appendChild($0d);
                for (var y = 0; y < this.rows.length; y++) {
                    this.drawCell(x, y, $0b);
                }
            }
        };
        this.$0S = function() {
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].onclick = null;
                }
            };
            this.nav.cells.innerHTML = '';
        };
        this.$0X = function() {
            return $d.api === 2;
        };
        this.drawCell = function(x, y, $0b) {
            var $n = this.rows[y];
            var d = DayPilot.Date.addDays(this.firstDate, y * 7 + x);
            var $0g = this.cellProperties ? this.cellProperties[y * this.getColCount() + x] : null;
            var $I = document.createElement("div");
            $I.setAttribute("unselectable", "on");
            $I.style.position = 'absolute';
            $I.style.cursor = 'default';
            $I.style.left = (this.getCellWidth() * x) + '%';
            $I.style.width = (this.getCellWidth()) + '%';
            $I.style.top = (this.getRowTop(y)) + 'px';
            $I.style.height = ($n.getHeight()) + 'px';
            if (this.cssOnly) {
                $I.className = this.$0W("_cell");
                if (!this.isWeekend(d)) {
                    var $0h = this.$0W("_cell_business");
                    DayPilot.Util.addClass($I, $0h);
                }
            };
            var $0i = this.startDate.addMonths(-1).getMonth();
            var $0j = this.startDate.addMonths(1).getMonth();
            var $0k = this.startDate.getMonth();
            var $L = document.createElement("div");
            $L.setAttribute("unselectable", "on");
            $I.appendChild($L);
            $L.style.position = "absolute";
            $L.style.left = "0px";
            $L.style.right = "0px";
            $L.style.top = "0px";
            $L.style.bottom = "0px";
            if (this.cssOnly) {
                $L.className = this.$0W("_cell_inner");
            } else {
                $L.style.backgroundColor = this.getCellBackColor(d);
                if (x !== this.getColCount() - 1) {
                    $L.style.borderRight = '1px solid ' + this.innerBorderColor;
                };
                if (y === 0) {
                    $L.style.borderTop = '1px solid ' + this.borderColor;
                };
                $L.style.borderBottom = '1px solid ' + this.innerBorderColor;
            };
            $I.onmousedown = function(e) {
                if ($d.timeRangeSelectedHandling !== 'Disabled') {
                    $d.clearShadow();
                    DayPilotMonth.timeRangeSelecting = {
                        "root": $d,
                        "x": x,
                        "y": y,
                        "from": {
                            x: x,
                            y: y
                        },
                        "width": 1
                    };
                }
            };
            $I.onclick = function() {
                var $0l = function(d) {
                    var $T = new DayPilot.Date(d);
                    var end = $T.addDays(1);
                    $d.timeRangeSelectedDispatch($T, end);
                };
                if ($d.timeRangeSelectedHandling !== 'Disabled') {
                    $0l(d);
                    return;
                }
            };
            var $0m = document.createElement("div");
            $0m.setAttribute("unselectable", "on");
            $0m.style.height = this.cellHeaderHeight + "px";
            if (this.cssOnly) {
                $0m.className = this.$0W("_cell_header");
            } else {
                if (this.cellHeaderBackColor) {
                    $0m.style.backgroundColor = this.cellHeaderBackColor;
                };
                $0m.style.paddingRight = '2px';
                $0m.style.textAlign = "right";
                $0m.style.fontFamily = this.cellHeaderFontFamily;
                $0m.style.fontSize = this.cellHeaderFontSize;
                $0m.style.color = this.cellHeaderFontColor;
            };
            var $0a = d.getUTCDate();
            if ($0a === 1) {
                $0m.innerHTML = $0f.locale().monthNames[d.getUTCMonth()] + ' ' + $0a;
            } else {
                $0m.innerHTML = $0a;
            };
            $L.appendChild($0m);
            this.cells[x][y] = $I;
            $0b.appendChild($I);
        };
        this.getWeekStart = function() {
            return $0f.locale().weekStarts;
        };
        this.getColCount = function() {
            return 7;
        };
        this.getCellWidth = function() {
            return 14.285;
        };
        this.getCellBackColor = function(d) {
            if (d.getUTCDay() === 6 || d.getUTCDay() === 0) {
                return this.nonBusinessBackColor;
            };
            return this.backColor;
        };
        this.getRowTop = function($k) {
            var top = this.headerHeight;
            for (var i = 0; i < $k; i++) {
                top += this.rows[i].getHeight();
            };
            return top;
        };
        this.callBack2 = function($0n, $g, $0o) {
            var $0p = {};
            $0p.action = $0n;
            $0p.parameters = $0o;
            $0p.data = $g;
            $0p.header = this.getCallBackHeader();
            var $0q = "JSON" + DayPilot.JSON.stringify($0p);
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.callBackResponse, $0q, this.ajaxError);
            }
        };
        this.callBackResponse = function($0r) {
            $d.updateView($0r.responseText);
        };
        this.getCallBackHeader = function() {
            var h = {};
            h.control = "dpm";
            h.id = this.id;
            h.v = this.v;
            h.visibleStart = new DayPilot.Date(this.firstDate);
            h.visibleEnd = h.visibleStart.addDays(this.days);
            h.startDate = $d.startDate;
            h.headerBackColor = this.headerBackColor;
            h.backColor = this.backColor;
            h.nonBusinessBackColor = this.nonBusinessBackColor;
            h.timeFormat = this.timeFormat;
            h.weekStarts = this.weekStarts;
            return h;
        };
        this.eventClickCallBack = function(e, $g) {
            this.callBack2('EventClick', $g, e);
        };
        this.eventClickDispatch = function(e) {
            DayPilotMonth.movingEvent = null;
            DayPilotMonth.resizingEvent = null;
            var $0s = this;
            var e = e || window.event;
            var $0t = e.ctrlKey;
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            };
            $d.eventClickSingle($0s, $0t);
        };
        this.eventClickSingle = function($0s) {
            var e = $0s.event;
            if (!e.client.clickEnabled()) {
                return;
            };
            if ($d.$0X()) {
                var $0u = {};
                $0u.e = e;
                $0u.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventClick === 'function') {
                    $d.onEventClick($0u);
                    if ($0u.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventClickHandling) {
                    case 'CallBack':
                        $d.eventClickCallBack(e);
                        break;
                };
                if (typeof $d.onEventClicked === 'function') {
                    $d.onEventClicked($0u);
                }
            } else {
                switch ($d.eventClickHandling) {
                    case 'CallBack':
                        $d.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $d.onEventClick(e);
                        break;
                }
            }
        };
        this.eventMoveCallBack = function(e, $0v, $0w, $g, $0x) {
            if (!$0v) throw 'newStart is null';
            if (!$0w) throw 'newEnd is null';
            var $0y = {};
            $0y.e = e;
            $0y.newStart = $0v;
            $0y.newEnd = $0w;
            $0y.position = $0x;
            this.callBack2('EventMove', $g, $0y);
        };
        this.eventMoveDispatch = function(e, x, y, $u, ev, $0x) {
            var $0z = DayPilot.Date.getTime(e.start().d);
            var $02 = DayPilot.Date.getDate(e.end().d);
            if ($02.getTime() !== e.end().d.getTime()) {
                $02 = DayPilot.Date.addDays($02, 1);
            };
            var $0A = DayPilot.Date.diff(e.end().d, $02);
            var $0B = this.getDateFromCell(x, y);
            $0B = DayPilot.Date.addDays($0B, -$u);
            var $t = DayPilot.Date.daysSpan(e.start().d, e.end().d) + 1;
            var $0C = DayPilot.Date.addDays($0B, $t);
            var $0v = new DayPilot.Date(DayPilot.Date.addTime($0B, $0z));
            var $0w = new DayPilot.Date(DayPilot.Date.addTime($0C, $0A));
            if ($d.$0X()) {
                var $0u = {};
                $0u.e = e;
                $0u.newStart = $0v;
                $0u.newEnd = $0w;
                $0u.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventResize === 'function') {
                    $d.onEventResize($0u);
                    if ($0u.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventMoveHandling) {
                    case 'CallBack':
                        $d.eventMoveHandling(e, $0v, $0w);
                        break;
                    case 'Update':
                        e.start($0v);
                        e.end($0w);
                        $d.events.update(e);
                        break;
                };
                if (typeof $d.onEventResized === 'function') {
                    $d.onEventResized($0u);
                }
            } else {
                switch ($d.eventMoveHandling) {
                    case 'CallBack':
                        $d.eventMoveCallBack(e, $0v, $0w);
                        break;
                    case 'JavaScript':
                        $d.onEventMove(e, $0v, $0w);
                        break;
                }
            }
        };
        this.eventResizeCallBack = function(e, $0v, $0w, $g) {
            if (!$0v) throw 'newStart is null';
            if (!$0w) throw 'newEnd is null';
            var $0y = {};
            $0y.e = e;
            $0y.newStart = $0v;
            $0y.newEnd = $0w;
            this.callBack2('EventResize', $g, $0y);
        };
        this.eventResizeDispatch = function(e, $T, $t) {
            var $0z = DayPilot.Date.getTime(e.start().d);
            var $02 = DayPilot.Date.getDate(e.end().d);
            if (!DayPilot.Date.equals($02, e.end().d)) {
                $02 = DayPilot.Date.addDays($02, 1);
            };
            var $0A = DayPilot.Date.diff(e.end().d, $02);
            var $0B = this.getDateFromCell($T.x, $T.y);
            var $0C = DayPilot.Date.addDays($0B, $t);
            var $0v = new DayPilot.Date(DayPilot.Date.addTime($0B, $0z));
            var $0w = new DayPilot.Date(DayPilot.Date.addTime($0C, $0A));
            if ($d.$0X()) {
                var $0u = {};
                $0u.e = e;
                $0u.newStart = $0v;
                $0u.newEnd = $0w;
                $0u.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventResize === 'function') {
                    $d.onEventResize($0u);
                    if ($0u.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventResizeHandling) {
                    case 'CallBack':
                        $d.eventResizeCallBack(e, $0v, $0w);
                        break;
                    case 'Update':
                        e.start($0v);
                        e.end($0w);
                        $d.events.update(e);
                        break;
                };
                if (typeof $d.onEventResized === 'function') {
                    $d.onEventResized($0u);
                }
            } else {
                switch ($d.eventResizeHandling) {
                    case 'CallBack':
                        $d.eventResizeCallBack(e, $0v, $0w);
                        break;
                    case 'JavaScript':
                        $d.onEventResize(e, $0v, $0w);
                        break;
                }
            }
        };
        this.timeRangeSelectedCallBack = function($T, end, $g) {
            var $0D = {};
            $0D.start = $T;
            $0D.end = end;
            this.callBack2('TimeRangeSelected', $g, $0D);
        };
        this.timeRangeSelectedDispatch = function($T, end) {
            if (this.$0X()) {
                var $0u = {};
                $0u.start = $T;
                $0u.end = end;
                $0u.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onTimeRangeSelect === 'function') {
                    $d.onTimeRangeSelect($0u);
                    if ($0u.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.timeRangeSelectedHandling) {
                    case 'CallBack':
                        $d.timeRangeSelectedCallBack($T, end);
                        break;
                };
                if (typeof $d.onTimeRangeSelected === 'function') {
                    $d.onTimeRangeSelected($0u);
                }
            } else {
                switch ($d.timeRangeSelectedHandling) {
                    case 'CallBack':
                        $d.timeRangeSelectedCallBack($T, end);
                        break;
                    case 'JavaScript':
                        $d.onTimeRangeSelected($T, end);
                        break;
                }
            }
        };
        this.clearSelection = function() {
            $d.clearShadow();
        };
        this.commandCallBack = function($0E, $g) {
            this.stopAutoRefresh();
            var $0y = {};
            $0y.command = $0E;
            this.callBack2('Command', $g, $0y);
        };
        this.isWeekend = function($0a) {
            $0a = new DayPilot.Date($0a);
            var $0F = 0;
            var $0G = 6;
            if ($0a.dayOfWeek() === $0F) {
                return true;
            };
            if ($0a.dayOfWeek() === $0G) {
                return true;
            };
            return false;
        };
        this.$0Y = {};
        this.$0Y.locale = function() {
            var $0H = DayPilot.Locale.find($d.locale);
            if (!$0H) {
                return DayPilot.Locale.US;
            };
            return $0H;
        };
        var $0f = this.$0Y;
        this.debug = function($0I, $0J) {
            if (!this.debuggingEnabled) {
                return;
            };
            if (!$d.debugMessages) {
                $d.debugMessages = [];
            };
            $d.debugMessages.push($0I);
            if (typeof console !== 'undefined') {
                console.log($0I);
            }
        };
        this.registerGlobalHandlers = function() {
            if (!DayPilotMonth.globalHandlers) {
                DayPilotMonth.globalHandlers = true;
                DayPilot.re(document, 'mouseup', DayPilotMonth.gMouseUp);
            }
        };
        this.loadFromServer = function() {
            return (typeof this.events === 'undefined') || (this.events === null);
        };
        this.show = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };
        this.initShort = function() {
            this.$0Q();
            this.drawTop();
            this.$0T();
            this.registerGlobalHandlers();
            this.callBack2('Init');
        };
        this.init = function() {
            var $0K = this.loadFromServer();
            loadDefaultCss();
            if ($0K) {
                this.initShort();
                return;
            };
            this.$0Q();
            this.$0R();
            this.drawTop();
            this.$0T();
            this.show();
            this.$0U();
            this.registerGlobalHandlers();
            if (this.messageHTML) {
                this.message(this.messageHTML);
            };
            this.fireAfterRenderDetached(null, false);
        };
        this.Init = this.init;
    };
    DayPilotMonth.gMouseUp = function(ev) {
        if (DayPilotMonth.movingEvent) {
            var $0L = DayPilotMonth.movingEvent;
            if (!$0L.event) {
                return;
            };
            if (!$0L.event.calendar) {
                return;
            };
            if (!$0L.event.calendar.shadow) {
                return;
            };
            if (!$0L.event.calendar.shadow.start) {
                return;
            };
            var $d = DayPilotMonth.movingEvent.event.calendar;
            var e = DayPilotMonth.movingEvent.event;
            var $T = $d.shadow.start;
            var $0x = $d.shadow.position;
            var $u = DayPilotMonth.movingEvent.offset;
            $d.clearShadow();
            DayPilotMonth.movingEvent = null;
            var ev = ev || window.event;
            $d.eventMoveDispatch(e, $T.x, $T.y, $u, ev, $0x);
            ev.cancelBubble = true;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            };
            DayPilotMonth.movingEvent = null;
            return false;
        } else if (DayPilotMonth.resizingEvent) {
            var $0L = DayPilotMonth.resizingEvent;
            if (!$0L.event) {
                return;
            };
            if (!$0L.event.calendar) {
                return;
            };
            if (!$0L.event.calendar.shadow) {
                return;
            };
            if (!$0L.event.calendar.shadow.start) {
                return;
            };
            var $d = DayPilotMonth.resizingEvent.event.calendar;
            var e = DayPilotMonth.resizingEvent.event;
            var $T = $d.shadow.start;
            var $t = $d.shadow.width;
            $d.clearShadow();
            DayPilotMonth.resizingEvent = null;
            $d.eventResizeDispatch(e, $T, $t);
            ev.cancelBubble = true;
            DayPilotMonth.resizingEvent = null;
            return false;
        } else if (DayPilotMonth.timeRangeSelecting) {
            if (DayPilotMonth.timeRangeSelecting.moved) {
                var $0M = DayPilotMonth.timeRangeSelecting;
                var $d = $0M.root;
                var $T = new DayPilot.Date($d.getDateFromCell($0M.from.x, $0M.from.y));
                var end = $T.addDays($0M.width);
                $d.timeRangeSelectedDispatch($T, end);
                $d.clearShadow();
            };
            DayPilotMonth.timeRangeSelecting = null;
        }
    };
    DayPilot.Month = DayPilotMonth.Month;
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotMonth = function($0N) {
                var $V = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $0O = new DayPilot.Month(this.id);
                    this.daypilot = $0O;
                    for (name in $0N) {
                        $0O[name] = $0N[name];
                    };
                    $0O.Init();
                    if (!$V) {
                        $V = $0O;
                    }
                });
                if (this.length === 1) {
                    return $V;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    if (typeof DayPilot.Navigator !== 'undefined') {
        return;
    };

    function loadDefaultCss() {
        if (DayPilot.Global.defaultNavigatorCss) {
            return;
        };
        var $a = DayPilot.sheet();
        $a.add(".navigator_default_main", "border-left: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;border-bottom: 1px solid #A0A0A0;background-color: white;color: #000000;");
        $a.add(".navigator_default_month", "font-family: Tahoma;font-size: 11px;");
        $a.add(".navigator_default_day", "color: black;");
        $a.add(".navigator_default_weekend", "background-color: #f0f0f0;");
        $a.add(".navigator_default_dayheader", "color: black;");
        $a.add(".navigator_default_line", "border-bottom: 1px solid #A0A0A0;");
        $a.add(".navigator_default_dayother", "color: gray;");
        $a.add(".navigator_default_todaybox", "border: 1px solid red;");
        $a.add(".navigator_default_select, .navigator_default_weekend.navigator_default_select", "background-color: #FFE794;");
        $a.add(".navigator_default_title, .navigator_default_titleleft, .navigator_default_titleright", 'border-top: 1px solid #A0A0A0;color: #666;background: #eee;background: -webkit-gradient(linear, left top, left bottom, from(#eeeeee), to(#dddddd));background: -webkit-linear-gradient(top, #eeeeee 0%, #dddddd);background: -moz-linear-gradient(top, #eeeeee 0%, #dddddd);background: -ms-linear-gradient(top, #eeeeee 0%, #dddddd);background: -o-linear-gradient(top, #eeeeee 0%, #dddddd);background: linear-gradient(top, #eeeeee 0%, #dddddd);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#eeeeee", endColorStr="#dddddd");');
        $a.add(".navigator_default_busy", "font-weight: bold;");
        $a.commit();
        DayPilot.Global.defaultNavigatorCss = true;
    };
    DayPilotNavigator = {};
    DayPilot.Navigator = function(id) {
        this.v = '126';
        var $b = this;
        this.id = id;
        this.api = 2;
        this.isNavigator = true;
        this.cssClassPrefix = "navigator_default";
        this.weekStarts = 'Auto';
        this.selectMode = 'day';
        this.titleHeight = 20;
        this.dayHeaderHeight = 20;
        this.cellWidth = 20;
        this.cellHeight = 20;
        this.cssOnly = true;
        this.selectionStart = new DayPilot.Date().getDatePart();
        this.selectionEnd = null;
        this.selectionDay = null;
        this.showMonths = 1;
        this.skipMonths = 1;
        this.command = "navigate";
        this.year = new DayPilot.Date().getYear();
        this.month = new DayPilot.Date().getMonth() + 1;
        this.locale = "en-us";
        this.timeRangeSelectedHandling = "Bind";
        this.$W = function() {
            this.root.dp = this;
            if (this.cssOnly) {
                this.root.className = this.$X('_main');
            } else {
                this.root.className = this.$X('main');
            };
            this.root.style.width = (this.cellWidth * 7) + 'px';
            this.root.style.position = "relative";
            var $c = document.createElement("input");
            $c.type = 'hidden';
            $c.name = $b.id + "_state";
            $c.id = $c.name;
            this.root.appendChild($c);
            this.state = $c;
            if (!this.startDate) {
                this.startDate = new DayPilot.Date(DayPilot.Date.firstDayOfMonth(this.year, this.month));
            } else {
                this.startDate = new DayPilot.Date(this.startDate).firstDayOfMonth();
            };
            this.calendars = [];
            this.selected = [];
            this.months = [];
        };
        this.$Y = function() {
            return $b.api === 2;
        };
        this.$Z = function() {
            this.root.innerHTML = '';
        };
        this.$X = function($d) {
            var $e = this.theme || this.cssClassPrefix;
            if ($e) {
                return $e + $d;
            } else {
                return "";
            }
        };
        this.$00 = function($f, name) {
            var $g = this.cssOnly ? this.$X("_" + name) : this.$X(name);
            DayPilot.Util.addClass($f, $g);
        };
        this.$01 = function($f, name) {
            var $g = this.cssOnly ? this.$X("_" + name) : this.$X(name);
            DayPilot.Util.removeClass($f, $g);
        };
        this.$02 = function(j, $h) {
            var $i = {};
            $i.cells = [];
            $i.days = [];
            $i.weeks = [];
            var $j = this.startDate.addMonths(j);
            var $k = $h.before;
            var $l = $h.after;
            var $m = $j.firstDayOfMonth();
            var $n = $m.firstDayOfWeek($o.weekStarts());
            var $p = $m.addMonths(1);
            var $q = DayPilot.Date.daysDiff($n.d, $p.d);
            var $r = 6;
            $i.rowCount = $r;
            var $s = (new DayPilot.Date()).getDatePart();
            var $t = this.cellWidth * 7;
            var $u = this.cellHeight * $r + this.titleHeight + this.dayHeaderHeight;
            $i.height = $u;
            var $v = document.createElement("div");
            $v.style.width = ($t) + 'px';
            $v.style.height = ($u) + 'px';
            $v.style.position = 'relative';
            if (this.cssOnly) {
                $v.className = this.$X('_month');
            } else {
                $v.className = this.$X('month');
            };
            $v.style.cursor = 'default';
            $v.style.MozUserSelect = 'none';
            $v.style.KhtmlUserSelect = 'none';
            $v.style.WebkitUserSelect = 'none';
            $v.month = $i;
            this.root.appendChild($v);
            var $w = this.titleHeight + this.dayHeaderHeight;
            var tl = document.createElement("div");
            tl.style.position = 'absolute';
            tl.style.left = '0px';
            tl.style.top = '0px';
            tl.style.width = this.cellWidth + 'px';
            tl.style.height = this.titleHeight + 'px';
            tl.style.lineHeight = this.titleHeight + 'px';
            tl.style.textAlign = 'left';
            tl.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                tl.className = this.$X('_titleleft');
            } else {
                tl.className = this.$X('titleleft');
            };
            if ($h.left) {
                tl.style.cursor = 'pointer';
                tl.innerHTML = "<span style='margin-left:2px;'>&lt;</span>";
                tl.onclick = this.$03;
            };
            $v.appendChild(tl);
            this.tl = tl;
            var ti = document.createElement("div");
            ti.style.position = 'absolute';
            ti.style.left = this.cellWidth + 'px';
            ti.style.top = '0px';
            ti.style.width = (this.cellWidth * 5) + 'px';
            ti.style.height = this.titleHeight + 'px';
            ti.style.lineHeight = this.titleHeight + 'px';
            ti.style.textAlign = 'center';
            ti.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                ti.className = this.$X('_title');
            } else {
                ti.className = this.$X('title');
            };
            ti.innerHTML = $o.locale().monthNames[$j.getMonth()] + ' ' + $j.getYear();
            $v.appendChild(ti);
            this.ti = ti;
            var tr = document.createElement("div");
            tr.style.position = 'absolute';
            tr.style.left = (this.cellWidth * 6) + 'px';
            tr.style.top = '0px';
            tr.style.width = this.cellWidth + 'px';
            tr.style.height = this.titleHeight + 'px';
            tr.style.lineHeight = this.titleHeight + 'px';
            tr.style.textAlign = 'right';
            tr.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                tr.className = this.$X('_titleright');
            } else {
                tr.className = this.$X('titleright');
            };
            if ($h.right) {
                tr.style.cursor = 'pointer';
                tr.innerHTML = "<span style='margin-right:2px;'>&gt;</span>";
                tr.onclick = this.$04;
            };
            $v.appendChild(tr);
            this.tr = tr;
            for (var x = 0; x < 7; x++) {
                $i.cells[x] = [];
                var dh = document.createElement("div");
                dh.style.position = 'absolute';
                dh.style.left = (x * this.cellWidth) + 'px';
                dh.style.top = this.titleHeight + 'px';
                dh.style.width = this.cellWidth + 'px';
                dh.style.height = this.dayHeaderHeight + 'px';
                dh.style.lineHeight = this.dayHeaderHeight + 'px';
                dh.style.textAlign = 'right';
                dh.setAttribute("unselectable", "on");
                if (this.cssOnly) {
                    dh.className = this.$X('_dayheader');
                } else {
                    dh.className = this.$X('dayheader');
                };
                dh.innerHTML = "<span style='margin-right: 2px'>" + this.$05(x) + "</span>";
                $v.appendChild(dh);
                $i.days.push(dh);
                for (var y = 0; y < $r; y++) {
                    var $x = $n.addDays(y * 7 + x);
                    var $y = this.$06($x) && this.selectMode !== 'none';
                    var $z = $x.getMonth() === $j.getMonth();
                    var $A = $x.getTime() < $j.getTime();
                    var $B = $x.getTime() > $j.getTime();
                    var $C;
                    var dc = document.createElement("div");
                    dc.day = $x;
                    dc.x = x;
                    dc.y = y;
                    dc.isCurrentMonth = $z;
                    if (this.cssOnly) {
                        dc.className = this.$X(($z ? '_day' : '_dayother'));
                    } else {
                        dc.className = this.$X(($z ? 'day' : 'dayother'));
                    };
                    if ($x.getTime() === $s.getTime() && $z) {
                        this.$00(dc, 'today');
                    };
                    if ($x.dayOfWeek() === 0 || $x.dayOfWeek() === 6) {
                        this.$00(dc, 'weekend');
                    };
                    dc.style.position = 'absolute';
                    dc.style.left = (x * this.cellWidth) + 'px';
                    dc.style.top = (y * this.cellHeight + $w) + 'px';
                    dc.style.width = this.cellWidth + 'px';
                    dc.style.height = this.cellHeight + 'px';
                    dc.style.lineHeight = this.cellHeight + 'px';
                    dc.style.textAlign = 'right';
                    var $D = document.createElement("div");
                    $D.style.position = 'absolute';
                    if (this.cssOnly) {
                        $D.className = ($x.getTime() === $s.getTime() && $z) ? this.$X('_todaybox') : this.$X('_daybox');
                    } else {
                        $D.className = ($x.getTime() === $s.getTime() && $z) ? this.$X('todaybox') : this.$X('daybox');
                    };
                    $D.style.left = '0px';
                    $D.style.top = '0px';
                    $D.style.width = (this.cellWidth - 2) + 'px';
                    $D.style.height = (this.cellHeight - 2) + 'px';
                    dc.appendChild($D);
                    var $E = null;
                    if (this.cells && this.cells[$x.toStringSortable()]) {
                        $E = this.cells[$x.toStringSortable()];
                        if ($E.css) {
                            this.$00(dc, $E.css);
                        }
                    };
                    var $F = null;
                    if ($z || ($k && $A) || ($l && $B)) {
                        $F = document.createElement("span");
                        $F.innerHTML = $x.getDay();
                        dc.style.cursor = 'pointer';
                        dc.isClickable = true;
                        if ($y) {
                            this.$00(dc, 'select');
                        };
                        if ($E && $E.html) {
                            $F.innerHTML = $E.html;
                        };
                        $F.style.marginRight = '2px';
                        dc.appendChild($F);
                    };
                    dc.setAttribute("unselectable", "on");
                    dc.onclick = this.$07;
                    dc.onmousedown = this.$08;
                    dc.onmousemove = this.$09;
                    if ($y) {
                        this.selected.push(dc);
                    };
                    $v.appendChild(dc);
                    $i.cells[x][y] = dc;
                }
            };
            var $G = document.createElement("div");
            $G.style.position = 'absolute';
            $G.style.left = '0px';
            $G.style.top = ($w - 2) + 'px';
            $G.style.width = (this.cellWidth * 7) + 'px';
            $G.style.height = '1px';
            $G.style.fontSize = '1px';
            $G.style.lineHeight = '1px';
            if (this.cssOnly) {
                $G.className = this.$X("_line");
            } else {
                $G.className = this.$X("line");
            };
            $v.appendChild($G);
            this.months.push($i);
        };
        this.$0a = function() {
            switch (this.selectMode) {
                case 'day':
                    this.selectionEnd = this.selectionStart;
                    break;
                case 'week':
                    this.selectionStart = this.selectionStart.firstDayOfWeek($o.weekStarts());
                    this.selectionEnd = this.selectionStart.addDays(6);
                    break;
                case 'month':
                    this.selectionStart = this.selectionStart.firstDayOfMonth();
                    this.selectionEnd = this.selectionStart.lastDayOfMonth();
                    break;
                case 'none':
                    this.selectionEnd = this.selectionStart;
                    break;
                default:
                    throw "Unkown selectMode value.";
            }
        };
        this.select = function($H) {
            var $I = true;
            var $J = this.selectionStart;
            var $K = this.selectionEnd;
            this.selectionStart = new DayPilot.Date($H).getDatePart();
            this.selectionDay = this.selectionStart;
            var $L = false;
            if ($I) {
                var $M = this.startDate;
                if (this.selectionStart.getTime() < this.visibleStart().getTime() || this.selectionStart.getTime() > this.visibleEnd().getTime()) {
                    $M = this.selectionStart.firstDayOfMonth();
                };
                if ($M.toStringSortable() !== this.startDate.toStringSortable()) {
                    $L = true;
                };
                this.startDate = $M;
            };
            this.$0a();
            this.$Z();
            this.$W();
            this.$0b();
            if (!$J.equals(this.selectionStart) || !$K.equals(this.selectionEnd)) {
                this.$0c();
            }
        };
        this.update = function() {
            this.$Z();
            this.$W();
            this.$0b();
        };
        this.$05 = function(i) {
            var x = i + $o.weekStarts();
            if (x > 6) {
                x -= 7;
            };
            return $o.locale().dayNamesShort[x];
        };
        this.$06 = function($H) {
            if (this.selectionStart === null || this.selectionEnd === null) {
                return false;
            };
            if (this.selectionStart.getTime() <= $H.getTime() && $H.getTime() <= this.selectionEnd.getTime()) {
                return true;
            };
            return false;
        };
        this.$08 = function(ev) {};
        this.$09 = function(ev) {};
        this.$07 = function(ev) {
            var $i = this.parentNode.month;
            var x = this.x;
            var y = this.y;
            var $x = $i.cells[x][y].day;
            if (!$i.cells[x][y].isClickable) {
                return;
            };
            $b.clearSelection();
            $b.selectionDay = $x;
            var $x = $b.selectionDay;
            switch ($b.selectMode) {
                case 'none':
                    $b.selectionStart = $x;
                    $b.selectionEnd = $x;
                    break;
                case 'day':
                    var s = $i.cells[x][y];
                    $b.$00(s, 'select');
                    $b.selected.push(s);
                    $b.selectionStart = s.day;
                    $b.selectionEnd = s.day;
                    break;
                case 'week':
                    for (var j = 0; j < 7; j++) {
                        $b.$00($i.cells[j][y], 'select');
                        $b.selected.push($i.cells[j][y]);
                    };
                    $b.selectionStart = $i.cells[0][y].day;
                    $b.selectionEnd = $i.cells[6][y].day;
                    break;
                case 'month':
                    var $N = null;
                    var end = null;
                    for (var y = 0; y < 6; y++) {
                        for (var x = 0; x < 7; x++) {
                            var s = $i.cells[x][y];
                            if (!s) {
                                continue;
                            };
                            if (s.day.getYear() === $x.getYear() && s.day.getMonth() === $x.getMonth()) {
                                $b.$00(s, 'select');
                                $b.selected.push(s);
                                if ($N === null) {
                                    $N = s.day;
                                };
                                end = s.day;
                            }
                        }
                    };
                    $b.selectionStart = $N;
                    $b.selectionEnd = end;
                    break;
                default:
                    throw 'unknown selectMode';
            };
            $b.$0c();
        };
        this.$0c = function() {
            var $N = $b.selectionStart;
            var end = $b.selectionEnd.addDays(1);
            var $q = DayPilot.Date.daysDiff($N.d, end.d);
            var $x = $b.selectionDay;
            if ($b.$Y()) {
                var $O = {};
                $O.start = $N;
                $O.end = end;
                $O.day = $x;
                $O.days = $q;
                $O.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $b.onTimeRangeSelect === 'function') {
                    $b.onTimeRangeSelect($O);
                    if ($O.preventDefault.value) {
                        return;
                    }
                };
                switch ($b.timeRangeSelectedHandling) {
                    case 'Bind':
                        var $P = eval($b.bound);
                        if ($P) {
                            var $Q = {};
                            $Q.start = $N;
                            $Q.end = end;
                            $Q.days = $q;
                            $Q.day = $x;
                            $P.commandCallBack($b.command, $Q);
                        };
                        break;
                    case 'None':
                        break;
                };
                if (typeof $b.onTimeRangeSelected === 'function') {
                    $b.onTimeRangeSelected($O);
                }
            } else {
                switch ($b.timeRangeSelectedHandling) {
                    case 'Bind':
                        var $P = eval($b.bound);
                        if ($P) {
                            var $Q = {};
                            $Q.start = $N;
                            $Q.end = end;
                            $Q.days = $q;
                            $Q.day = $x;
                            $P.commandCallBack($b.command, $Q);
                        };
                        break;
                    case 'JavaScript':
                        $b.onTimeRangeSelected($N, end, $x);
                        break;
                    case 'None':
                        break;
                }
            }
        };
        this.$04 = function(ev) {
            $b.$0d($b.skipMonths);
        };
        this.$03 = function(ev) {
            $b.$0d(-$b.skipMonths);
        };
        this.$0d = function(i) {
            this.startDate = this.startDate.addMonths(i);
            this.$Z();
            this.$W();
            this.$0b();
        };
        this.visibleStart = function() {
            return $b.startDate.firstDayOfMonth().firstDayOfWeek($o.weekStarts());
        };
        this.visibleEnd = function() {
            return $b.startDate.firstDayOfMonth().addMonths(this.showMonths - 1).firstDayOfWeek($o.weekStarts()).addDays(42);
        };
        this.$0b = function() {
            for (var j = 0; j < this.showMonths; j++) {
                var $h = this.$0e(j);
                this.$02(j, $h);
            };
            this.root.style.height = this.$0f() + "px";
        };
        this.$0f = function() {
            var $R = 0;
            for (var i = 0; i < this.months.length; i++) {
                var $i = this.months[i];
                $R += $i.height;
            };
            return $R;
        };
        this.$0e = function(j) {
            if (this.internal.showLinks) {
                return this.internal.showLinks;
            };
            var $h = {};
            $h.left = (j === 0);
            $h.right = (j === 0);
            $h.before = j === 0;
            $h.after = j === this.showMonths - 1;
            return $h;
        };
        this.internal = {};
        this.$0g = {};
        var $o = this.$0g;
        $o.locale = function() {
            return DayPilot.Locale.find($b.locale);
        };
        $o.weekStarts = function() {
            if ($b.weekStarts === 'Auto') {
                var $S = $o.locale();
                if ($S) {
                    return $S.weekStarts;
                } else {
                    return 0;
                }
            } else {
                return $b.weekStarts;
            }
        };
        this.clearSelection = function() {
            for (var j = 0; j < this.selected.length; j++) {
                this.$01(this.selected[j], 'select');
            };
            this.selected = [];
        };
        this.$0h = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $b.items === 'undefined') || (!$b.items);
            } else {
                return false;
            }
        };
        this.init = function() {
            this.root = document.getElementById(id);
            loadDefaultCss();
            if (this.root.dp) {
                return;
            };
            this.$0a();
            this.$W();
            this.$0b();
            this.$0i();
            this.initialized = true;
        };
        this.dispose = function() {
            var c = $b;
            if (!c.root) {
                return;
            };
            c.root.removeAttribute("style");
            c.root.removeAttribute("class");
            c.root.dp = null;
            c.root.innerHTML = null;
            c.root = null;
        };
        this.$0i = function() {
            var $T = document.getElementById(id);
            $T.dispose = this.dispose;
        };
        this.Init = this.init;
    };
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotNavigator = function($U) {
                var $n = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $V = new DayPilot.Navigator(this.id);
                    this.daypilot = $V;
                    for (var name in $U) {
                        $V[name] = $U[name];
                    };
                    $V.Init();
                    if (!$n) {
                        $n = $V;
                    }
                });
                if (this.length === 1) {
                    return $n;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();