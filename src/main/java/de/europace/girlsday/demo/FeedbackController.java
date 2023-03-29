package de.europace.girlsday.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController {

    @GetMapping("/")
    public String index() {
        return "Hi Girls!";
    }
}
