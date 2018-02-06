using System.Collections.Generic;
using System;

namespace OnlineShop {
    public class TypeConverter
    {
        public static string BoolToString(bool x) {
            return x ? "true" : "false";
        }

        public static string ListStringToString(List<string> sizes) {
            string result = "";
            foreach(string s in sizes)
                result += s + " ";
            return result;
        }

        public static List<string> StringToListString(string sizes) {
            return new List<string>(sizes.Split(' ', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}