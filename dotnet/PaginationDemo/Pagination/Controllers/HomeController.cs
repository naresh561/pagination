using Pagination.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pagination.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SearchResult(jsonstudent ss)
        {
            Result r = new Result();
            try
            {
                using (StudentsEntities se = new StudentsEntities())
                {
                    var students = se.newstudents.Where(s => s.first_name.Contains(ss.first_name) && s.last_name.Contains(ss.last_name) && s.email.Contains(ss.email)
                        && s.rollnumber.Contains(ss.rollnumber)
                        ).ToList();
                    if (ss.israngeChanged)
                    {
                        foreach (var item in ss.range)
                        {
                            students = students.Where(s => item.min <= (int)s[item.field] && (int)s[item.field] <= item.max).ToList();
                        }
                    }
                    if (ss.isselectionChanged)
                    {
                        foreach (var item in ss.selectables)
                        {
                            if (item.value != null) students = students.Where(s => item.value.Any(x => x == s[item.key].ToString())).ToList();
                        }
                    }
                    outputResult o = new outputResult();
                    o.count = students.Count();
                    if (!ss.isselectionChanged)
                    {
                        foreach (var item in ss.selectables)
                        {
                            var tempdata = students.Select(s => s[item.key]).ToList().Distinct().ToList();
                            List<string> sampledata = new List<string>();
                            foreach (var temp in tempdata)
                            {
                                sampledata.Add(temp.ToString());
                            }
                            o.selectables.Add(item.key, sampledata);
                        }
                    }
                    foreach (var item in ss.range)
                    {
                        o.range.Add(new Range { 
                            field = item.field,
                            min = (int)students.Min(s => s[item.field]),
                            max = (int)students.Max(s => s[item.field])
                        });
                    }
                    r.status = 1;
                    r.data = o;

                }
            }
            catch (Exception e)
            {
                r.data = "";
                r.error = e.Message;
                r.status = 0;
            }
            return Json(r);
        }
 
        [HttpPost]
        public JsonResult PaginationResult(jsonstudent ss)
        {
            Result r = new Result();
            int perpage = ss.perpage;
            try
            {
                using (StudentsEntities se = new StudentsEntities())
                {
                    var students = se.newstudents.Where(s => s.first_name.Contains(ss.first_name) && s.last_name.Contains(ss.last_name) && s.email.Contains(ss.email)
                        && s.rollnumber.Contains(ss.rollnumber)
                        ).ToList();
                    foreach (var item in ss.range)
                    {
                        students = students.Where(s => item.min <= (int)s[item.field] && (int)s[item.field] <= item.max).ToList();
                    }
                    foreach (var item in ss.selectables)
                    {
                        if(item.value != null) students = students.Where(s => item.value.Any(x => x == s[item.key].ToString())).ToList();
                    }
                    r.status = 1;
                    if ((ss.pageno - 1) * ss.perpage + ss.perpage > students.Count)
                        perpage = students.Count - (ss.pageno - 1) * ss.perpage;
                    r.data = students.GetRange((ss.pageno - 1) * ss.perpage, perpage);
                    if (ss.orderBy != null)
                    {
                        if (ss.orderType.ToLower() == "asc") r.data = students.GetRange((ss.pageno - 1) * ss.perpage, perpage).OrderBy(s => s[ss.orderBy]);
                        else r.data = students.GetRange((ss.pageno - 1) * ss.perpage, perpage).OrderByDescending(s => s[ss.orderBy]);
                    }
                }
            }
            catch(Exception e)
            {
                r.data = "";
                r.error = e.Message;
                r.status = 0;
            }
            return Json(r);
        }
    }

    public class outputResult
    {
        public outputResult()
        {
            range = new List<Range>();
            selectables = new Dictionary<string, List<string>>();
        }
        public List<Range> range { get; set; }
        public int count { get; set; }
        public Dictionary<string,List<string>> selectables {get; set;}
    }

    public class jsonstudent : newstudent
    {
        public string orderBy { get; set; }
        public string orderType { get; set; }
        public int pageno { get; set; }
        public int perpage { get; set; }
        public List<Range> range { get; set; }//
        public List<Selectables> selectables { get; set; }
        public bool israngeChanged { get; set; }
        public bool isselectionChanged { get; set; }
    }

    public class Range
    {
        public string field { get; set; }
        public int min { get; set; }
        public int max { get; set; }
    }

    public class Selectables
    {
        public string key { get; set; }
        public List<string> value { get; set; }
    }

    public class Result
    {
        public int status { get; set; }
		public dynamic data  { get; set; }
        public string error { get; set; }
    }
}
