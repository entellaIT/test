﻿
using System;
using System.Web.Caching;
using System.Web.Mvc;

 
    /// <summary>
    /// Summary description for HtmlHelperExtensions
    /// </summary>

    public static class HtmlHelperExtensions
    {

        public static MvcHtmlString IncludeVersionedJs(this HtmlHelper helper, string filename)
        {
            string version = GetVersion(helper, filename);
            return MvcHtmlString.Create("<script type='text/javascript' src='" + filename + version + "'></script>");
        }

        public static MvcHtmlString IncludeVersionedCss(this HtmlHelper helper, string filename)
        {
            string version = GetVersion(helper, filename);
            return MvcHtmlString.Create("<link rel='stylesheet' href='" + filename + version + "' />");
        }

        private static string GetVersion(this HtmlHelper helper, string filename)
        {
            var context = helper.ViewContext.RequestContext.HttpContext;

            if (context.Cache[filename] == null)
            {
                var physicalPath = context.Server.MapPath(filename);
                var version = "?v=" +
                  new System.IO.FileInfo(physicalPath).LastWriteTime
                    .ToString("yyyyMMddhhmmss");
                context.Cache.Add(physicalPath, version, null,
                  DateTime.Now.AddMinutes(1), TimeSpan.Zero,
                  CacheItemPriority.Normal, null);
                context.Cache[physicalPath] = version;
                return version;
            }
            else
            {
                return context.Cache[filename] as string;
            }
        }
    }

 