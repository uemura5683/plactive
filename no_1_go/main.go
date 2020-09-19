package main

import (
    "fmt"
    "net/http"
    "html/template"
    "time"
)

func main(){
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

        fmt.Println(time.Now().Format("2006/01/02 15:04:05") + " " + r.URL.Path)

        // テンプレート用のファイルを読み込む
        tpl, err1 := template.ParseFiles("templates/index.html")
        if err1 != nil {
            panic(err1)
        }

        // テンプレートを出力
        err2 := tpl.Execute(w, struct {
            Title string
            Message string
            List []string
            Link string
        }{
            Title: "Hello",
            Message: "World",
            List: []string{
                "Item1",
                "Item2",
                "Item3",
            },
            Link: "<a href=\"/\">hoge</a>",
        })
        if err2 != nil {
            panic(err2)
        }

    })
    http.ListenAndServe(":9001", nil)
}