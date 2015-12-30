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
            int count = 0;
            try
            {
                using (StudentsEntities se = new StudentsEntities())
                {
                    var students = se.newstudents.Where(s => s.first_name.Contains(ss.first_name) && s.last_name.Contains(ss.last_name) && s.email.Contains(ss.email)
                        && s.rollnumber.Contains(ss.rollnumber)
                        ).ToList();

                    count = students.Count();
                    r.status = 1;
                    r.data = count;

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
            try
            {
                using (StudentsEntities se = new StudentsEntities())
                {
                    var students = se.newstudents.Where(s => s.first_name.Contains(ss.first_name) && s.last_name.Contains(ss.last_name) && s.email.Contains(ss.email)
                        && s.rollnumber.Contains(ss.rollnumber)
                        ).ToList();
                    r.status = 1;
                    r.data = students.GetRange((ss.pageno - 1) * ss.perpage, ss.perpage);
                    if (ss.orderBy != null)
                    {
                        if (ss.orderType.ToLower() == "asc") r.data = students.GetRange((ss.pageno - 1) * ss.perpage, ss.perpage).OrderBy(s => s[ss.orderBy]);
                        else r.data = students.GetRange((ss.pageno - 1) * ss.perpage, ss.perpage).OrderByDescending(s => s[ss.orderBy]);
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

    public class jsonstudent : newstudent
    {
        public string orderBy { get; set; }
        public string orderType { get; set; }
        public int pageno { get; set; }
        public int perpage { get; set; }
    }

    public class Result
    {
        public int status { get; set; }
		public dynamic data  { get; set; }
        public string error { get; set; }
    }
}
