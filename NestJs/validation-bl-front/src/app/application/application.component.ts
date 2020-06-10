import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "./application.service";
import { ActivatedRoute } from "@angular/router";
import { ApplicationDto } from "./dto/application.dto";

@Component({
  selector: "app-application",
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.css"],
})
export class ApplicationComponent implements OnInit {


  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) {}

  applications: ApplicationDto[];
  ngOnInit(): void {

    this.loadData();

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params["action"] && params["action"] == "reload") {
        this.loadData();
      }
    });
  }

  loadData() {
    this.applicationService.getAll().subscribe((d) => {
      this.applications = [...d];
    });
  }
}
